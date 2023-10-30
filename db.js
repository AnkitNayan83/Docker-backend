const { Pool } = require("pg");

const pool = new Pool({
    host: "db",
    post: 5432,
    user: "Ankit@Nayan",
    password: "pass123",
    database: "db123"
})

module.exports = pool;