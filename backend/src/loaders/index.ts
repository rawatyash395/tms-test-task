import DataLoader from 'dataloader';
import { query } from '../db/connection';
import { Shipment, User } from '../types';

// DataLoader for batching and caching shipment queries
export const createShipmentLoader = () => {
  return new DataLoader<number, Shipment>(async (ids) => {
    const result = await query(
      `SELECT * FROM shipments WHERE id = ANY($1::int[])`,
      [Array.from(ids)]
    );

    const shipmentsMap = new Map<number, Shipment>();
    result.rows.forEach((row: any) => {
      shipmentsMap.set(row.id, row as Shipment);
    });

    return ids.map((id) => shipmentsMap.get(id)!);
  });
};

// DataLoader for batching and caching user queries
export const createUserLoader = () => {
  return new DataLoader<number, User>(async (ids) => {
    const result = await query(
      `SELECT id, email, name, role, created_at FROM users WHERE id = ANY($1::int[])`,
      [Array.from(ids)]
    );

    const usersMap = new Map<number, User>();
    result.rows.forEach((row: any) => {
      usersMap.set(row.id, row as User);
    });

    return ids.map((id) => usersMap.get(id)!);
  });
};
