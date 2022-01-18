const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'development'
      ? null
      : { rejectUnauthorized: false },
});
module.exports = {
  query(text, params) {
    return pool.query(text, params);
  },
};
