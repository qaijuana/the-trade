const express = require("express");
const router = express.Router();
const pool = require("../database");

console.log(pool.query)


//! Get all Listings

//! Get one listings 

//! Create Listings

router.post("/new", async (req, res) => {
    try {
        
    } catch (error) {
        res.sendStatus()
    }
})

//! Edit listings 

//! Delete listings 


module.exports = router 