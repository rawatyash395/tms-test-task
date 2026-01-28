import { Context, ShipmentFilterInput, SortInput } from '../types';
import { requireAuth, requireAdmin } from '../auth';
import { query } from '../db/connection';

export const shipmentResolvers = {
  Query: {
    shipments: async (
      _: any,
      {
        filter,
        page = 1,
        limit = 10,
        sort,
      }: {
        filter?: any;
        page?: number;
        limit?: number;
        sort?: any;
      },
      context: Context
    ) => {
      requireAuth(context);

      const conditions: string[] = [];
      const params: any[] = [];
      let paramIndex = 1;

      if (filter) {
        if (filter.status) {
          conditions.push(`status = $${paramIndex++}`);
          params.push(filter.status);
        }
        if (filter.carrier_name) {
          conditions.push(`carrier_name ILIKE $${paramIndex++}`);
          params.push(`%${filter.carrier_name}%`);
        }
        if (filter.priority) {
          conditions.push(`priority = $${paramIndex++}`);
          params.push(filter.priority);
        }
        if (filter.search) {
          conditions.push(`(
            shipper_name ILIKE $${paramIndex} OR
            tracking_number ILIKE $${paramIndex} OR
            cargo_type ILIKE $${paramIndex} OR
            pickup_location ILIKE $${paramIndex} OR
            delivery_location ILIKE $${paramIndex}
          )`);
          params.push(`%${filter.search}%`);
          paramIndex++;
        }
        if (filter.date_from) {
          conditions.push(`pickup_date >= $${paramIndex++}`);
          params.push(filter.date_from);
        }
        if (filter.date_to) {
          conditions.push(`pickup_date <= $${paramIndex++}`);
          params.push(filter.date_to);
        }
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      let orderClause = 'ORDER BY created_at DESC';
      if (sort) {
        const allowedFields = [
          'id',
          'shipper_name',
          'carrier_name',
          'pickup_date',
          'status',
          'rate_amount',
          'priority',
          'created_at',
        ];
        if (allowedFields.includes(sort.field)) {
          const order = sort.order === 'ASC' ? 'ASC' : 'DESC';
          orderClause = `ORDER BY ${sort.field} ${order}`;
        }
      }

      const countResult = await query(
        `SELECT COUNT(*) FROM shipments ${whereClause}`,
        params
      );
      const totalCount = parseInt(countResult.rows[0].count);

      const totalPages = Math.ceil(totalCount / limit);
      const offset = (page - 1) * limit;

      const result = await query(
        `SELECT * FROM shipments ${whereClause} ${orderClause} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
        [...params, limit, offset]
      );

      return {
        items: result.rows,
        totalCount,
        page,
        limit,
        totalPages,
      };
    },

    shipment: async (_: any, { id }: { id: number }, context: Context) => {
      requireAuth(context);

      const result = await query('SELECT * FROM shipments WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        throw new Error('Shipment not found');
      }

      return result.rows[0];
    },

    systemStats: async (_: any, __: any, context: Context) => {
      requireAuth(context);

      const shipmentsCount = await query('SELECT COUNT(*) FROM shipments');
      const pendingCount = await query("SELECT COUNT(*) FROM shipments WHERE status = 'pending'");
      const inTransitCount = await query("SELECT COUNT(*) FROM shipments WHERE status = 'in_transit'");
      const deliveredCount = await query("SELECT COUNT(*) FROM shipments WHERE status = 'delivered'");
      const usersCount = await query('SELECT COUNT(*) FROM users');

      return {
        totalShipments: parseInt(shipmentsCount.rows[0].count),
        pendingShipments: parseInt(pendingCount.rows[0].count),
        inTransitShipments: parseInt(inTransitCount.rows[0].count),
        deliveredShipments: parseInt(deliveredCount.rows[0].count),
        totalUsers: parseInt(usersCount.rows[0].count),
      };
    },
  },

  Shipment: {
    created_by: async (parent: any, _: any, { loaders }: Context) => {
      if (!parent.created_by) return null;
      return loaders.user.load(parent.created_by);
    },
    pickup_date: (parent: any) => parent.pickup_date instanceof Date ? parent.pickup_date.toISOString() : parent.pickup_date,
    delivery_date: (parent: any) => parent.delivery_date instanceof Date ? parent.delivery_date.toISOString() : parent.delivery_date,
    estimated_delivery: (parent: any) => parent.estimated_delivery instanceof Date ? parent.estimated_delivery.toISOString() : parent.estimated_delivery,
    created_at: (parent: any) => parent.created_at instanceof Date ? parent.created_at.toISOString() : parent.created_at,
    updated_at: (parent: any) => parent.updated_at instanceof Date ? parent.updated_at.toISOString() : parent.updated_at,
  },

  Mutation: {
    createShipment: async (_: any, { input }: { input: any }, context: Context) => {
      const user = requireAdmin(context);

      const tracking_number = input.tracking_number || `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const result = await query(
        `INSERT INTO shipments (
          shipper_name, shipper_email, shipper_phone,
          carrier_name, carrier_contact,
          pickup_location, pickup_date,
          delivery_location, estimated_delivery,
          tracking_number, status,
          weight_kg, dimensions, cargo_type,
          rate_amount, currency, priority, notes,
          created_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        RETURNING *`,
        [
          input.shipper_name,
          input.shipper_email,
          input.shipper_phone,
          input.carrier_name,
          input.carrier_contact,
          input.pickup_location,
          input.pickup_date,
          input.delivery_location,
          input.estimated_delivery,
          tracking_number,
          input.status || 'pending',
          input.weight_kg,
          input.dimensions,
          input.cargo_type,
          input.rate_amount,
          input.currency || 'USD',
          input.priority || 'normal',
          input.notes,
          user.id,
        ]
      );

      return result.rows[0];
    },

    updateShipment: async (
      _: any,
      { id, input }: { id: number; input: any },
      context: Context
    ) => {
      requireAdmin(context);

      const fields: string[] = [];
      const params: any[] = [];
      let paramIndex = 1;

      Object.keys(input).forEach((key) => {
        if (input[key] !== undefined) {
          fields.push(`${key} = $${paramIndex++}`);
          params.push(input[key]);
        }
      });

      if (fields.length === 0) {
        throw new Error('No fields to update');
      }

      fields.push(`updated_at = CURRENT_TIMESTAMP`);
      params.push(id);

      const result = await query(
        `UPDATE shipments SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
        params
      );

      if (result.rows.length === 0) {
        throw new Error('Shipment not found');
      }

      return result.rows[0];
    },

    deleteShipment: async (_: any, { id }: { id: number }, context: Context) => {
      requireAdmin(context);

      const result = await query('DELETE FROM shipments WHERE id = $1', [id]);

      return (result.rowCount ?? 0) > 0;
    },
  },
};
