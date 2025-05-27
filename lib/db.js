const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // XAMPP default password is empty
  database: 'my_database',
  port: 3308 // Default MySQL port
};

const pool = mysql.createPool(dbConfig);

module.exports = pool; 