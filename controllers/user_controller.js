const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../database")


// show 

router.get("/", async (req, res) => {
    const allUsers = await pool.query(
        "SELECT * FROM users;"
    )
    res.json(allUsers.rows)
})
// show one

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const findUser = await pool.query(
            "SELECT * FROM users WHERE id = $1", [id]
        )
        findUser.rows[0].password = "lol suck on it"
        res.json(findUser.rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
})

//! CREATE USER
router.post("/new", async (req, res) => {
    const username = req.body.username.toLowerCase();
    const email = req.body.email.toLowerCase();
    try {
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await pool.query(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
            [username, hashedPassword, email]
        )
        res.json(newUser.rows[0])
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }

})

// edit

router.put("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const {
        first_name,
        last_name,
        username,
        email,
        password,
        user_photo,
        about
    } = req.body

    if (first_name) {
        const updateFirstName = await pool.query(
            "UPDATE users SET first_name = $1 WHERE id = $2", [first_name, id]
        )
    }
    if (last_name) {
        const updateLastName = await pool.query(
            "UPDATE users SET last_name = $1 WHERE id = $2", [last_name, id]
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
    res.sendStatus(200)
})

// delete

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

//! LOGIN

// router.post("/login", async (req, res) => {
//     //! SWITCH TO DATABASE QUERY HERE 
//     // const user = users.find(user => user.name === req.body.name)
//     const findUser = pool.query(
//         "SELECT username, email, password FROM users")
//     if (!user) {
//         return res.status(400).send("Invalid Username/Password");
//     }
//     try {
//         if (await bcrypt.compare(req.body.password, user.password)) {
//             res.send("Success");
//         } else {
//             res.send("You did an oopsie");
//         }
//     } catch (error) {
//         res.sendStatus(400)
//     }
// })

module.exports = router;