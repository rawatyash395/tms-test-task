import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  console.log('🔍 Testing PostgreSQL connection...\n');
  
  const isConnectionString = process.env.DB_HOST?.startsWith('postgresql://') || process.env.DB_HOST?.startsWith('postgres://');
  
  const pool = new Pool(
    isConnectionString 
      ? { 
          connectionString: process.env.DB_HOST,
          ssl: { rejectUnauthorized: false }
        }
      : {
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || '5432'),
          database: 'postgres',
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
        }
  );

  try {
    // Test connection
    const client = await pool.connect();
    console.log('✅ PostgreSQL connection successful!');
    
    // Check if configured database exists
    const dbName = process.env.DB_NAME || 'railway';
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );
    
    if (result.rows.length > 0) {
      console.log(`✅ Database "${dbName}" exists`);
    } else {
      console.log(`❌ Database "${dbName}" NOT found`);
      console.log('\n📝 To create the database, run:');
      console.log(`   psql -U postgres -c "CREATE DATABASE ${dbName};"`);
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
