require("dotenv").config();
const { Pool } = require("pg");



const pool = new Pool({
    user: "vaytombyphixyv",
    password: process.env.POSTGRES_PASSWORD,
    database: "dfavms8iimfcv0",
    host: "ec2-34-202-54-225.compute-1.amazonaws.com",
    port: 5432,
    ssl: {
        required: true,
        rejectUnauthorized: false
    },
});

 
module.exports = pool

