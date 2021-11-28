const express = require("express");
const router = express.Router();
const pool = require("../database");
const authToken = require("./authToken");

router.get("/", async (req, res) => {
    console.log("get all")
    const allLists = await pool.query(
        "SELECT listings.id, title, price, description,upload_date, category, condition, list_images, users.username, user_id FROM listings FULL JOIN users ON user_id = users.id"
    )
    res.json(allLists.rows)
})

//! GET ONE LISTINGS
router.get("/:id", async (req, res) => {
    console.log("did i end up here instead?????")
    const { id } = req.params;
    console.log("id", id)
    const oneList = await pool.query(
        "SELECT listings.id, title, price, description,upload_date, category, condition, list_images, users.username, user_id FROM listings FULL JOIN users ON user_id = users.id WHERE listings.id = $1",
        [id]
    )
    console.log(oneList.rows)
    res.json(oneList.rows[0])
})


// router.get("/:id/:user", async (req, res) => {
//     const { user, id } = req.params;
//     const userLists = await pool.query(
//         "JOIN WHERE user_id = ",
//         [user, id]
//     )
//     res.json(userLists.rows)
// })

//! CREATE LISTINGS // SET AUTHTOKEN
router.post("/new", authToken, async (req, res) => {
    const { id } = req.cookies;
    const {
        title, price, description, category, condition, user_id, list_images
    } = req.body;
    console.log("create", id, user_id)
    const upload_date = new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', '');

    console.log(req.body);

    try {
        const addList = await pool.query(
            "INSERT INTO listings (title, price, description, user_id, upload_date, category, condition) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
            [
                title,
                price,
                description,
                user_id,
                upload_date,
                category,
                condition,
            ]
        );
        res.json(addList)
        // res.sendStatus(200);
    } catch (error) {
        console.error(error);
    };
});


//! EDIT LIST
router.post("/:id/edit", authToken, async (req, res) => {
    const { id } = req.params;
    const {
        title, price, description, list_images, category, condition
    } = req.body;

console.log("we are editing lists", req.body)
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
        res.json({msg: "all good"})
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
    }
})

//! DELETE
router.delete("/:id", authToken, async (req, res) => {
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