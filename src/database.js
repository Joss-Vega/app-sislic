const Pool = require('pg').Pool

const pool = new Pool({
    host: '144.22.56.92',
    user: 'root',
    password: 'root',
    database: 'root',
    port: '5432',
})

module.exports = pool;