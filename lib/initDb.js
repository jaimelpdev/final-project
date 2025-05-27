const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

async function initializeDatabase() {
  // First, create a connection without database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // XAMPP default password is empty
    port: 3308 // Default MySQL port
  });

  try {
    // Create database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS my_database');
    await connection.query('USE my_database');

    // Read and execute the database creation script
    const dbScript = await fs.readFile(
      path.join(process.cwd(), 'Crear base de datos proyectoweb.txt'),
      'utf8'
    );
    
    // Split the script into individual statements and filter out the CREATE DATABASE command
    const statements = dbScript
      .split(';')
      .filter(statement => {
        const trimmed = statement.trim();
        return trimmed && !trimmed.toLowerCase().includes('create database');
      })
      .map(statement => {
        // Replace CREATE TABLE with CREATE TABLE IF NOT EXISTS
        return statement.replace(/CREATE TABLE/g, 'CREATE TABLE IF NOT EXISTS') + ';';
      });

    // Execute each statement
    for (const statement of statements) {
      await connection.query(statement);
    }

    // Read and execute the data insertion script
    const dataScript = await fs.readFile(
      path.join(process.cwd(), 'Insercion de datos proyecto final.txt'),
      'utf8'
    );

    // Split the script into individual statements
    const dataStatements = dataScript
      .split(';')
      .filter(statement => statement.trim())
      .map(statement => statement + ';');

    // Execute each statement
    for (const statement of dataStatements) {
      try {
        await connection.query(statement);
      } catch (error) {
        // Skip duplicate key errors for data insertion
        if (error.code !== 'ER_DUP_ENTRY') {
          throw error;
        }
      }
    }

    console.log('Database and tables created successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error; // Re-throw the error to handle it in the server
  } finally {
    await connection.end();
  }
}

module.exports = initializeDatabase; 