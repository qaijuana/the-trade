const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../database")


const users = [];




// show 

router.get("/", async (req, res) => {
    const allUsers = await pool.query(
        "SHOW username, password, id FROM users"
    )
    res.json(allUsers)
})
// show one

router.get("/:id", (req, res) => {
    const { id } = req.params;
    console.log(id, res);
    res.json("lol");
})

//! CREATE USER
router.post("/new", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await pool.query(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
            [req.body.username, hashedPassword, req.body.email]
        )
        res.json(newUser)
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }


})

// edit

router.put("/edit/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.json("lol");
})

// delete

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.json("lol");
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