const express = require("express");
const image = express.Router();
const pool = require("../database")
const cloudinary = require("cloudinary").v2;


//! Get images of User's listing;
image.get("/:id", async (req, res) => {
    const { id } = req.params;
    const list_photo = await pool.query(
        "SELECT url, public_id FROM list_photos WHERE listings_id = $1",
        [id]
    )
    res.json(list_photo);
});

image.post("/new", async (req, res) => {
    // const { action } = req.params;
    const { id } = req.cookies;
    if (!id) return res.sendStatus(403);
    const { files } = req.body;

});



module.exports = image;