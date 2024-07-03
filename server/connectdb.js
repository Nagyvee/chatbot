const {createPool} = require('mysql2')
require('dotenv').config()


const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 25,
    waitForConnections: true,
})

module.exports = pool