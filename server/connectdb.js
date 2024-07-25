const {createPool} = require('mysql2')
require('dotenv').config()


const pool = createPool({
    host: process.env.HOST,
    port: process.env.AVN_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 25,
    waitForConnections: true,
    ssl: { ca: process.env.SSL}
})

module.exports = pool