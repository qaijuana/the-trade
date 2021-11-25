const bcrypt = require("bcrypt");
const { json } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../database")
const authToken = require("./authToken")

//! SHOW ALL FOR ADMIN
router.get("/", authToken, async (req, res) => {
    const allUsers = await pool.query(
        "SELECT * FROM users;"
    )
    res.json(allUsers.rows)
})

//! CREATE USER
router.post("/new", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    try {
        const newUser = await pool.query(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id",
            [username, hashedPassword, email]
        )
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
    }

})

//! This is causing things to crash. 
//! SHOW USER PROFILE w/ LISTINGS
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const findUser = await pool.query(
            "SELECT * FROM users FULL JOIN listings ON users.id = user_id WHERE users.id = $1", [id]
        )
        findUser.rows[0].password = "lol suck on it"
        const results = await findUser.rows;
        res.json(results);

    } catch (error) {
        res.sendStatus(400)
    }
})

//! EDIT
router.post("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const {
        name,
        username,
        email,
        password,
        user_photo,
        about
    } = req.body;
    console.log(req.body)
    try {
        if (name) {
            const updateName = await pool.query(
                "UPDATE users SET name = $1 WHERE id = $2", [name, id]
            )
        }
        if (about) {
            const updateAbout = await pool.query(
                "UPDATE users SET about = $1 WHERE id = $2", [about, id]
            )
        }
        if (username) {
            const updateUsername = await pool.query(
                "UPDATE users SET username = $1 WHERE id = $2", [username, id]
            )
        }
        if (email) {
            const updateEmail = await pool.query(
                "UPDATE users SET email = $1 WHERE id = $2", [email, id]
            )
        }
        if (password) {
            const salt = await bcrypt.genSalt(7);
            const hashedPassword = await bcrypt.hash(password, salt)
            const updatepassword = await pool.query(
                "UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, id]
            )
        }
        if (user_photo) {
            const updateUserPhoto = await pool.query(
                "UPDATE users SET user_photo = $1 WHERE id = $2", [user_photo, id]
            )
        }
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(401);
        console.error(error);
    }


});

//! DELETE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUser = await pool.query(
            "DELETE FROM users WHERE id = $1", [id]
        )

    } catch (error) {
        res.sendStatus(400)
    }
})


module.exports = router;