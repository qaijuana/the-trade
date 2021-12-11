const express = require("express");
const router = express.Router();
const pool = require("../database");
const authToken = require("./authToken");
const cloudinary = require("cloudinary").v2;

router.get("/", async (req, res) => {
    const allLists = await pool.query(
        "SELECT listings.id AS listings_id, users.username, title, price, description, upload_date, category, condition, list_images, user_id FROM listings FULL JOIN users ON user_id = users.id ORDER BY listings.id DESC"
    )
    res.json(allLists.rows)
})

//! GET ONE LISTINGS
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id", id)
    const oneList = await pool.query(
        "SELECT listings.id AS listings_id, users.username, title, price, description, upload_date, category, condition, list_images, user_id FROM listings FULL JOIN users ON user_id = users.id WHERE listings.id = $1",
        [id]
    )
    res.json(oneList.rows[0])
})


//! CREATE LISTINGS // SET AUTHTOKEN
router.post("/new", async (req, res) => {
    const { id } = req.cookies;
    const {
        title, price, description, category, condition, user_id, files
    } = req.body;
    const upload_date = Date.now()

    try {
        try {
            const addList = await pool.query(
                "INSERT INTO listings (title, price, description, user_id, category, condition, upload_date) VALUES ($1, $2, $3, $4, $5, $6, (to_timestamp(($7)/ 1000.0))) RETURNING id",
                [
                    title,
                    price,
                    description,
                    user_id,
                    category,
                    condition,
                    upload_date,
                ]
            );
            console.log("add list", addList.rows);
            const id = addList.rows[0].id

            const cloudUpload = await cloudinary.uploader.upload(
                files, (error, result) => {
                    // console.log(result, error);
                    if (error) return console.log(error);
                    return result;
                });
            try {
                const updateList_photo = await pool.query(
                    "INSERT INTO list_photos (url, public_id, listings_id) VALUES ($1, $2, $3) RETURNING id",
                    [
                        cloudUpload?.url, cloudUpload?.public_id, id
                    ]
                )
                res.sendStatus(200);

            } catch (error) {
                console.log("Cloudinary failed", error)
            }
        } catch (error) {
            console.log("Update List photo failed", error)
        }
    } catch (error) {
        console.log("Create List failed", error)
    }



    // res.json(addList)

});


//! EDIT LIST
router.post("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const {
        title, price, description, category, condition, user_id, files
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
        if (category) {
            const updatecategory = await pool.query(
                "UPDATE listings SET category = $1 WHERE id = $2", [category, id]
            )
        }
        if (condition) {
            const updatelistcondition = await pool.query(
                "UPDATE listings SET condition = $1 WHERE id = $2", [condition, id]
            )
        }
        if (files) {
            const cloudUpload = await cloudinary.uploader.upload(
                files, (error, result) => {
                    if (error) return error;
                    return result;
                });
            const list_photo = await cloudUpload.url
            console.log("Cloudi response:", cloudUpload, list_photo);
            const updateList_photo = await pool.query(
                "INSERT INTO list_photos (url, public_id, listings_id) VALUES ($1, $2, $3) RETURNING id",
                [
                    cloudUpload?.url, cloudUpload?.public_id, id
                ]
            )
            console.log("Updated list_photos", updateList_photo.rows[0]);
        }
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