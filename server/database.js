const { Pool, Client } = require("pg");

const pool = new Pool({
    user: "qai",
    password: "imin ",
    database: "ecommerce",
    host: "localhost",
    port: 5432
});
 
module.exports = pool

