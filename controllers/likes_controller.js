const express = require("express");
const likes = express.Router();
const pool = require("../database");

// likes.get("/:user_id", async (req, res) => {
//     const { user_id } = req.params;
//     const getLikes = await pool.query(
//         "SELECT * FROM likes WHERE users_id = $1",
//         [users_id]
//     )
//     const results = await getLikes.rows;
//     res.json(results);
// })

likes.get("/:listings_id/:user_id", async (req, res) => {
    const { listings_id, user_id } = req.params;
    const isLiked = await pool.query(
        "SELECT likes FROM likes WHERE listings_id = $1 AND users_id = $2",
        [listings_id, user_id]
    )
    const results = await isLiked.rows
    res.json(results)
})

likes.post("/:listings_id", async (req, res) => {
    const { listings_id } = req.params;
    const { users_id } = req.body;
    const addLikes = await pool.query(
        "INSERT INTO likes (users_id, listings_id) VALUES ($1, $2) RETURNING id",
        [users_id, listings_id]
    )
    const results = await addLikes.rows;
    res.json(results);
})

likes.delete("/:likes_id", async (req, res) => {
    const { likes_id } = req.params;
    try {
        const deleteLikes = await pool.query(
            "DELETE FROM listings WHERE id = $1",
            [likes_id]
        )
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
    }
})

module.exports = likes;