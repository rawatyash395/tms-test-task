import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  console.log('🔍 Testing PostgreSQL connection...\n');
  
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: 'postgres', // Connect to default postgres database first
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    // Test connection
    const client = await pool.connect();
    console.log('✅ PostgreSQL connection successful!');
    
    // Check if tms_db exists
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'tms_db'"
    );
    
    if (result.rows.length > 0) {
      console.log('✅ Database "tms_db" exists');
    } else {
      console.log('❌ Database "tms_db" NOT found');
      console.log('\n📝 To create the database, run:');
      console.log('   psql -U postgres -c "CREATE DATABASE tms_db;"');
      console.log('   OR use pgAdmin to create a database named "tms_db"');
    }
    
    client.release();
    await pool.end();
    
  } catch (error: any) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n💡 Tips:');
    console.log('   1. Make sure PostgreSQL is running');
    console.log('   2. Check your credentials in backend/.env');
    console.log('   3. Default password is usually "postgres"');
    await pool.end();
    process.exit(1);
  }
}

testConnection();
