require('dotenv').config();
const pool = require('./src/config/database');

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully');
    console.log(result.rows[0]);
  } catch (error) {
    console.error('Database connection failed:', error.message);
  } finally {
    process.exit();
  }
}

testConnection();