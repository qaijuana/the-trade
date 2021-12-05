const express = require("express");
const image = express.Router();
const pool = require("../database")

//! Get images of User's listing;
image.get("/:id", async (req, res) => {
    const { id } = req.body;
    const list_image = await pool.query(
        "SELECT"
    )
})

image.post("/new", (req, res) => {
    const { id } = req.cookies;
    const { action } = req.params;
    const { files } = req.body;
    cloudinary.v2.uploader.upload(`${files}`,
        function (error, result) { console.log(result, error) });
})



module.exports = image;