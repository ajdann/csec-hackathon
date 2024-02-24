const express = require('express');
const pool = require('./db'); // Import the database connection pool

const app = express();

// Example API endpoint to test connection
app.get('/test', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const results = await connection.query('SELECT 1 + 1 AS sum');
    connection.release();

    res.json({ message: 'Connection successful', sum: results[0].sum });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error connecting to database' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
