const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const users = [];
console.log(users);

//! CREATE USER
router.post("/new", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = {
            username: req.body.username,
            password: hashedPassword
        };
        users.push(user);
        res.sendStatus(201);
        console.log(users)
    } catch (error) {
        res.sendStatus(500);
    }




})

//! LOGIN

router.post("/login", async (req, res) => {
    //! SWITCH TO DATABASE QUERY HERE 
    const user = users.find(user => user.name === req.body.name)
    if (!user) {
        return res.status(400).send("Invalid Username/Password");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Success");
        } else {
            res.send("You did an oopsie");
        }
    } catch (error) {
        res.sendStatus(400)
    }
})

// show one

router.get("/show/:id", (req, res) => {
    const { id } = req.params;
    console.log(id, res);
    res.json("lol");
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

module.exports = router;