const express = require("express");
const router = express.Router();
const pool = require("../database")

router.get("/", async (req, res) => {
    const allLists = await pool.query(
        "SELECT * FROM listings"
    )
    res.json(allLists.rows)
})

//! GET ONE LISTINGS
router.get("/:id", async (req, res) => {
    const { id } = req.body;
    const oneList = await pool.query(
        "SELECT * FROM listings WHERE id = $1",
        [id]
    )
    res.json(oneList.rows[0])
})

router.get("/:id/:user", async (req, res) => {
    const { user, id } = req.body;
    const userLists = await pool.query(
        "JOIN WHERE user_id = ",
        [user, id]
    )
    res.json(userLists.rows)
})

//! CREATE LISTINGS
router.post("/new", async (req, res) => {
    const {
        title, price, description, list_images
    } = req.body;
    try {
        const addList = await pool.query(
            "INSERT INTO listings (title, price, description, user_id, upload_date, list_images) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
            [title, price, description, user_id, upload_date, list_images]
        );
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
    };
});


//! EDIT LIST
router.post("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const {
        title, price, description, list_images
    } = req.body;

    try {
        if (title) {
            const updatetitle = await pool.query(
                "UPDATE listings SET title = $1 WHERE id = $2", [title, id]
            )
        }
        if (price) {
            const updateprice = await pool.query(
                "UPDATE listings SET price = $1 WHERE id = $2", [price, id]
            )
        }
        if (description) {
            const updatedescription = await pool.query(
                "UPDATE listings SET description = $1 WHERE id = $2", [description, id]
            )
        }
        if (list_images) {
            const updatelist_images = await pool.query(
                "UPDATE listings SET list_images = $1 WHERE id = $2", [list_images, id]
            )
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
    }
})

//! DELETE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUser = await pool.query(
            "DELETE FROM listings WHERE id = $1", [id]
        )

    } catch (error) {
        res.sendStatus(400)
    }
})

module.exports = router;