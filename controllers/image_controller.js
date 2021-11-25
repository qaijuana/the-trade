const express = require("express");
const router = express.Router();
const pool = require("../database")

//! Get images of User's listing;
router.get("/:id", async (req, res) => {
    const { id } = req.body;
    const list_image = await pool.query(
        "SELECT"
    )


})

module.exports = router;