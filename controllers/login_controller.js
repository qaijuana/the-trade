const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../database");

function authenticateToken(req, res, next) {
    // const authHeader = req.headers['authorization'];
    // //! if authHeader is true (&&) then authHeader.split will be done
    // const token = authHeader && authHeader.split(" ")[1];
    const token = req.cookie;
    console.log(token)
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user;
        next();

    })
}

function generateAccessToken(user) {
    return (jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" }))
}

router.get("/silent", authenticateToken, (req, res) => {
    res.json(post.filter(post => post.username === req.user.name))
})


router.post("/", async (req, res) => {
    //* authenticate user
    const username = req.body.username;
    const pswrd = req.body.password;
    const findUser = await pool.query(
        "SELECT id, username, password FROM users WHERE username = $1", [username]
    )
    const results = findUser.rows[0];

    if (!results) {
        return res.status(400).send("Invalid Username/Password");
    }
    try {
        if (await bcrypt.compare(pswrd, results.password)) {
            const accessToken = generateAccessToken({ name: results.username });
            const refreshToken = jwt.sign({ name: results.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "15m" })
            //! Push token into database!!! 
            const newRefreshToken = await pool.query(
                "UPDATE users SET refresh_token = $1 WHERE id = $2",
                [refreshToken, results.id]
            )
            //! Stash inside cookie
            const newAccessToken = res.cookie("token", accessToken, {
                httpOnly: true
            })
            console.log(newAccessToken)
            res.json({
                // accessToken: accessToken,
                // refreshToken: refreshToken,
                id: results.id
            })

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


//! LOGOUT
router.post("/logout", async (req, res) => {
    //! Delete token cookie here
    console.log(res.cookie)
    res.clearCookie("token")
    //! Delete refreshtoken from database here 
    const delRefreshToken = await pool.query(
        "UPDATE users SET refresh_token = NULL WHERE id = $1 RETURNING *", [req.body.id]
    )
    res.json(delRefreshToken.rows[0])
    // res.sendStatus(204);
})


module.exports = router