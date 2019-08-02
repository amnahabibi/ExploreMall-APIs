const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'exploredb',
    port: 3307,
    debug: false,
    multipleStatements: true
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;