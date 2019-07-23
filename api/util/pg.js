const { Pool } = require('pg');

// create the connection to database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'ourtreedev',
    password: process.env.DB_PASS
});

pool.on('connect', () => {
    console.log('connected to the db');
});

if (process.env.NODE_ENV === 'development') {
    // dummy function to verify if database connection is establish successfuly
    pool.query('SELECT NOW()', (err, res) => {
        if (err) throw err;
        console.log(res.rows);
    });
}

module.exports = pool;