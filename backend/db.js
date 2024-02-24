const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost', // Update with your database host
  user: 'your_username', // Update with your database username
  password: 'your_password', // Update with your database password
  database: 'your_database_name', // Update with your database name
});

module.exports = pool;
