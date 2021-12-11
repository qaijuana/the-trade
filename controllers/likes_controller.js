const express = require("express");
const likes = express.Router();
const pool = require("../database");


likes.get("/", async (req, res) => {
    const user_id = req.cookies.id;
    const show_likes = await pool.query(
        "SELECT users.username, likes.listings_id, likes.users_id, title, price, description, upload_date, category, condition, list_images, likes, sold FROM likes FULL JOIN listings ON likes.listings_id = listings.id FULL JOIN users ON likes.users_id = users.id WHERE users.id = $1 AND likes.id IS NOT NULL",
        [user_id]
    )
    const results = await show_likes.rows
    res.json(results);
})

likes.get("/:listings_id", async (req, res) => {
    const { listings_id } = req.params;
    const user_id = req.cookies.id;
    const isLiked = await pool.query(
        "SELECT likes, id AS likes_id FROM likes WHERE listings_id = $1 AND users_id = $2",
        [listings_id, user_id]
    )
    const results = await isLiked.rows
    res.json(results)
})

likes.post("/:listings_id", async (req, res) => {
    const { listings_id } = req.params;
    const users_id = req.cookies.id;
    const addLikes = await pool.query(
        "INSERT INTO likes (users_id, listings_id) VALUES ($1, $2) RETURNING id",
        [users_id, listings_id]
    )
    const results = await addLikes.rows;
    res.json(results);
})

likes.delete("/:likes_id", async (req, res) => {
    const { likes_id } = req.params;
    const deleteLikes = await pool.query(
        "DELETE FROM likes WHERE id = $1",
        [likes_id]
    )
    res.sendStatus(200)
})

module.exports = likes;