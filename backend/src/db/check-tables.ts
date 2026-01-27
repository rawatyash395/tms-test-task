import pool from './connection';
import dotenv from 'dotenv';

dotenv.config();

async function checkTables() {
  console.log('🔍 Checking database tables...\n');

  try {
    // Check if users table exists
    const usersCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);

    // Check if shipments table exists
    const shipmentsCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'shipments'
      );
    `);

    const usersExist = usersCheck.rows[0].exists;
    const shipmentsExist = shipmentsCheck.rows[0].exists;

    if (usersExist && shipmentsExist) {
      console.log('✅ Tables exist');
      
      // Count records
      const usersCount = await pool.query('SELECT COUNT(*) FROM users');
      const shipmentsCount = await pool.query('SELECT COUNT(*) FROM shipments');
      
      console.log(`   - Users: ${usersCount.rows[0].count}`);
      console.log(`   - Shipments: ${shipmentsCount.rows[0].count}`);
      console.log('\n✅ Database is ready!');
    } else {
      console.log('❌ Tables not found');
      console.log('\n📝 Run this command to set up the database:');
      console.log('   npm run db:setup');
    }

    await pool.end();
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    await pool.end();
    process.exit(1);
  }
}

checkTables();
