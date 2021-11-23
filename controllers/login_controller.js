const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../database");

const post = [{
    username: "max",
    password: "notMax"
},
{
    username: "alan",
    password: "barry"
}
]

//! DEMO. USE DATABASES TO STORE REFRESH TOKENS
let refreshTokens = [];

router.get("/", authenticateToken, (req, res) => {
    res.json(post.filter(post => post.username === req.user.name))
})


router.post("/", async (req, res) => {
    //* authenticate user
    // const { username, password, } = req.body;
    const username = req.body.username;
    const pswrd = req.body.password;
    const findUser = await pool.query(
        "SELECT * FROM users WHERE username = $1", [username]
    )
    const results = findUser.rows[0];
    console.log(username, typeof username)
    console.log(pswrd, typeof pswrd);
    console.log(results)
    // console.log(id, username, password)
    // console.log(req.body)

    if (!findUser) {
        return res.status(400).send("Invalid Username/Password");
    }
    try {
        if (await bcrypt.compare(pswrd, results.password)) {
            const accessToken = generateAccessToken({ name: results.username });
            const refreshToken = jwt.sign({ name: results.username }, process.env.REFRESH_TOKEN_SECRET)
            //! Push token into database!!! 
            // refreshTokens.push(refreshToken)
            // console.log(refreshTokens)
            const newRefreshToken = await pool.query(
                "UPDATE users SET refresh_token = $1 WHERE id = $2",
                [refreshToken, results.id]
            )
            res.json({ accessToken: accessToken, refreshToken: refreshToken })

        } else {
            res.send("You did an oopsie");
        }
    } catch (error) {
        res.sendStatus(400)
    }
})

router.post("/token", (req, res) => {
    const refreshToken = req.body.token;

    if (refreshToken == null)
        return res.sendStatus(401);
    //! Push refreshtoken into database
    if (!refreshTokens.includes(refreshToken))
        return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
            if (err) return res.sendStatus(403);
            const accessToken = generateAccessToken({ id: id })
            res.json({ accessToken: accessToken })
        }
    )
})

router.delete("/logout", (req, res) => {
    //! Delete refreshtoken from database here 
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    //! if authHeader is true (&&) then authHeader.split will be done
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user;
        next();

    })
}

function generateAccessToken(user) {
    return (jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10000s" }))
}

module.exports = router