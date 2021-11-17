const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

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


router.post("/", (req, res) => {
    //* authenticate user
    console.log(req.body)
    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)

    res.json({ accessToken: accessToken, refreshToken: refreshToken })


})

router.post("/token", (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null)
        return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken))
        return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
            if (err)
                return res.sendStatus(403)
            const accessToken = generateAccessToken({ name: user.name })
            res.json({ accessToken: accessToken })
        }
    )
})

router.delete("/logout", (req, res) => {
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
    return (jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" }))
}

module.exports = router