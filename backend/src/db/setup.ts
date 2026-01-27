import pool, { query } from './connection';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  console.log('🚀 Setting up database...');

  try {
    // Drop tables if they exist to refresh constraints and data
    await query(`DROP TABLE IF EXISTS shipments CASCADE`);
    await query(`DROP TABLE IF EXISTS users CASCADE`);
    console.log('✅ Existing tables dropped');

    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'employee')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Create shipments table
    await query(`
      CREATE TABLE IF NOT EXISTS shipments (
        id SERIAL PRIMARY KEY,
        shipper_name VARCHAR(255) NOT NULL,
        shipper_email VARCHAR(255),
        shipper_phone VARCHAR(50),
        carrier_name VARCHAR(255) NOT NULL,
        carrier_contact VARCHAR(255),
        pickup_location VARCHAR(500) NOT NULL,
        pickup_date DATE NOT NULL,
        delivery_location VARCHAR(500) NOT NULL,
        delivery_date DATE,
        estimated_delivery DATE,
        tracking_number VARCHAR(100) UNIQUE,
        status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_transit', 'delivered', 'cancelled', 'delayed')),
        weight_kg DECIMAL(10, 2),
        dimensions VARCHAR(100),
        cargo_type VARCHAR(255),
        rate_amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'USD',
        priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
        notes TEXT,
        is_flagged BOOLEAN DEFAULT FALSE,
        flagged_reason TEXT,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Shipments table created');

    // Create index for performance
    await query(`CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_shipments_tracking ON shipments(tracking_number)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_shipments_created_at ON shipments(created_at DESC)`);
    console.log('✅ Indexes created');

    // Create default users
    const adminPassword = await bcrypt.hash('admin123', 10);
    const employeePassword = await bcrypt.hash('employee123', 10);

    await query(`
      INSERT INTO users (email, password, name, role)
      VALUES 
        ($1, $2, 'Admin User', 'admin'),
        ($3, $4, 'Employee User', 'employee')
      ON CONFLICT (email) DO NOTHING
    `, ['admin@tms.com', adminPassword, 'employee@tms.com', employeePassword]);
    console.log('✅ Default users created');

    // Insert dummy shipment data
    const shipments = [
      {
        shipper: 'Global Logistics Inc',
        email: 'contact@globallogistics.com',
        phone: '+1-555-0101',
        carrier: 'FedEx Express',
        contact: 'fedex@carrier.com',
        pickup: 'New York, NY 10001, USA',
        pickup_date: '2026-02-01',
        delivery: 'Los Angeles, CA 90001, USA',
        estimated: '2026-02-05',
        tracking: 'TRK-2026-001',
        status: 'in_transit',
        weight: 450.50,
        dimensions: '120x80x60 cm',
        cargo: 'Electronics',
        rate: 1250.00,
        priority: 'high'
      },
      {
        shipper: 'Tech Solutions Ltd',
        email: 'shipping@techsolutions.com',
        phone: '+1-555-0102',
        carrier: 'UPS Ground',
        contact: 'ups@carrier.com',
        pickup: 'Chicago, IL 60601, USA',
        pickup_date: '2026-01-28',
        delivery: 'Miami, FL 33101, USA',
        estimated: '2026-02-02',
        tracking: 'TRK-2026-002',
        status: 'pending',
        weight: 320.00,
        dimensions: '100x70x50 cm',
        cargo: 'Office Equipment',
        rate: 890.00,
        priority: 'normal'
      },
      {
        shipper: 'Manufacturing Co',
        email: 'orders@manufacturing.com',
        phone: '+1-555-0103',
        carrier: 'DHL International',
        contact: 'dhl@carrier.com',
        pickup: 'Houston, TX 77001, USA',
        pickup_date: '2026-01-25',
        delivery: 'Seattle, WA 98101, USA',
        estimated: '2026-01-30',
        tracking: 'TRK-2026-003',
        status: 'delivered',
        weight: 680.75,
        dimensions: '150x100x80 cm',
        cargo: 'Industrial Parts',
        rate: 1850.00,
        priority: 'urgent'
      },
      {
        shipper: 'Food Distributors Inc',
        email: 'logistics@fooddist.com',
        phone: '+1-555-0104',
        carrier: 'Swift Transportation',
        contact: 'swift@carrier.com',
        pickup: 'Atlanta, GA 30301, USA',
        pickup_date: '2026-02-02',
        delivery: 'Boston, MA 02101, USA',
        estimated: '2026-02-06',
        tracking: 'TRK-2026-004',
        status: 'pending',
        weight: 1200.00,
        dimensions: '200x120x100 cm',
        cargo: 'Perishable Goods',
        rate: 2100.00,
        priority: 'high'
      },
      {
        shipper: 'Medical Supplies Corp',
        email: 'shipping@medsupply.com',
        phone: '+1-555-0105',
        carrier: 'FedEx Priority',
        contact: 'fedex@carrier.com',
        pickup: 'Phoenix, AZ 85001, USA',
        pickup_date: '2026-01-30',
        delivery: 'Denver, CO 80201, USA',
        estimated: '2026-02-01',
        tracking: 'TRK-2026-005',
        status: 'in_transit',
        weight: 85.50,
        dimensions: '60x40x30 cm',
        cargo: 'Medical Equipment',
        rate: 650.00,
        priority: 'urgent'
      },
      {
        shipper: 'Fashion Imports LLC',
        email: 'orders@fashionimports.com',
        phone: '+1-555-0106',
        carrier: 'USPS Priority Mail',
        contact: 'usps@carrier.com',
        pickup: 'San Francisco, CA 94102, USA',
        pickup_date: '2026-01-27',
        delivery: 'Portland, OR 97201, USA',
        estimated: '2026-01-31',
        tracking: 'TRK-2026-006',
        status: 'delayed',
        weight: 125.00,
        dimensions: '80x60x40 cm',
        cargo: 'Textiles',
        rate: 420.00,
        priority: 'normal'
      },
      {
        shipper: 'Auto Parts Warehouse',
        email: 'shipping@autoparts.com',
        phone: '+1-555-0107',
        carrier: 'XPO Logistics',
        contact: 'xpo@carrier.com',
        pickup: 'Detroit, MI 48201, USA',
        pickup_date: '2026-02-03',
        delivery: 'Nashville, TN 37201, USA',
        estimated: '2026-02-07',
        tracking: 'TRK-2026-007',
        status: 'pending',
        weight: 950.25,
        dimensions: '180x90x70 cm',
        cargo: 'Automotive Parts',
        rate: 1680.00,
        priority: 'normal'
      },
      {
        shipper: 'BookStore Distributors',
        email: 'logistics@bookstore.com',
        phone: '+1-555-0108',
        carrier: 'UPS Express',
        contact: 'ups@carrier.com',
        pickup: 'Philadelphia, PA 19101, USA',
        pickup_date: '2026-01-29',
        delivery: 'Washington, DC 20001, USA',
        estimated: '2026-01-31',
        tracking: 'TRK-2026-008',
        status: 'in_transit',
        weight: 280.00,
        dimensions: '100x80x60 cm',
        cargo: 'Books & Media',
        rate: 520.00,
        priority: 'low'
      },
      {
        shipper: 'Construction Materials Inc',
        email: 'orders@constructmat.com',
        phone: '+1-555-0109',
        carrier: 'J.B. Hunt Transport',
        contact: 'jbhunt@carrier.com',
        pickup: 'Dallas, TX 75201, USA',
        pickup_date: '2026-01-26',
        delivery: 'Minneapolis, MN 55401, USA',
        estimated: '2026-01-30',
        tracking: 'TRK-2026-009',
        status: 'delivered',
        weight: 2400.00,
        dimensions: '250x150x120 cm',
        cargo: 'Building Materials',
        rate: 3200.00,
        priority: 'normal'
      },
      {
        shipper: 'Furniture Emporium',
        email: 'shipping@furniture.com',
        phone: '+1-555-0110',
        carrier: 'Old Dominion Freight',
        contact: 'olddom@carrier.com',
        pickup: 'San Diego, CA 92101, USA',
        pickup_date: '2026-02-04',
        delivery: 'Las Vegas, NV 89101, USA',
        estimated: '2026-02-08',
        tracking: 'TRK-2026-010',
        status: 'pending',
        weight: 560.00,
        dimensions: '200x100x80 cm',
        cargo: 'Furniture',
        rate: 980.00,
        priority: 'low'
      },
      {
        shipper: 'Pharma Solutions Inc',
        email: 'logistics@pharmasol.com',
        phone: '+1-555-0111',
        carrier: 'FedEx Custom Critical',
        contact: 'fedex@carrier.com',
        pickup: 'Indianapolis, IN 46201, USA',
        pickup_date: '2026-01-31',
        delivery: 'Columbus, OH 43201, USA',
        estimated: '2026-02-02',
        tracking: 'TRK-2026-011',
        status: 'in_transit',
        weight: 45.00,
        dimensions: '40x30x20 cm',
        cargo: 'Pharmaceuticals',
        rate: 890.00,
        priority: 'urgent'
      },
      {
        shipper: 'Electronics World',
        email: 'orders@electronicsworld.com',
        phone: '+1-555-0112',
        carrier: 'DHL Express',
        contact: 'dhl@carrier.com',
        pickup: 'Austin, TX 78701, USA',
        pickup_date: '2026-02-01',
        delivery: 'San Jose, CA 95101, USA',
        estimated: '2026-02-05',
        tracking: 'TRK-2026-012',
        status: 'pending',
        weight: 380.50,
        dimensions: '110x70x55 cm',
        cargo: 'Consumer Electronics',
        rate: 1120.00,
        priority: 'high'
      }
    ];

    for (const ship of shipments) {
      await query(`
        INSERT INTO shipments (
          shipper_name, shipper_email, shipper_phone,
          carrier_name, carrier_contact,
          pickup_location, pickup_date,
          delivery_location, estimated_delivery,
          tracking_number, status,
          weight_kg, dimensions, cargo_type,
          rate_amount, priority,
          created_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 1)
        ON CONFLICT (tracking_number) DO NOTHING
      `, [
        ship.shipper, ship.email, ship.phone,
        ship.carrier, ship.contact,
        ship.pickup, ship.pickup_date,
        ship.delivery, ship.estimated,
        ship.tracking, ship.status,
        ship.weight, ship.dimensions, ship.cargo,
        ship.rate, ship.priority
      ]);
    }
    console.log('✅ Dummy shipment data inserted');

    console.log('\n🎉 Database setup complete!');
    console.log('\n👤 Default users:');
    console.log('   Admin: admin@tms.com / admin123');
    console.log('   Employee: employee@tms.com / employee123\n');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

setupDatabase();
