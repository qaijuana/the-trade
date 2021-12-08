const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../database");
const authToken = require("./authToken");


//? Consider setting a separate server for authentication. 

function genToken(user) {
    return (jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" }))
}

//! COOKIE REFRESH

router.get("/token", async (req, res) => {
    const { cookies } = req;
    if (!cookies) {
        res.sendStatus(401);
    }
    const findRefreshToken = await pool.query(
        "SELECT refresh_token FROM users WHERE id = $1", [cookies.id]
    )
    if (!findRefreshToken) {
        res.sendStatus(401)
    }
    const refreshToken = await findRefreshToken.rows?.[0]?.refresh_token
    if (refreshToken) {
        //! VERIFY TOKEN
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
            async (err, user) => {
                if (err) {
                    res.sendStatus(403);
                    console.log("error in jwt")
                }
                console.log(user);
                //! If refreshtoken verified, generate new access token
                const accessToken = genToken({ id: cookies.id })
                const refreshToken = jwt.sign({ id: cookies.id }, process.env.REFRESH_TOKEN_SECRET)
                //! Push token into database!!! 
                const newRefreshToken = await pool.query(
                    "UPDATE users SET refresh_token = $1 WHERE id = $2",
                    [refreshToken, cookies.id]
                )
                const newAccessToken = res.cookie("token", accessToken, {
                    httpOnly: true,
                    secure: true
                })
                const current_user = res.cookie("id", cookies.id, {
                    httpOnly: true,
                    secure: true
                })
                res.json({
                    id: cookies.id
                })
            }
        )
    }

});

///////////////////////////////
///////////////////////////////
//! LOGIN
//////////////////////////////
//////////////////////////////
router.post("/", async (req, res) => {
    //? Clear cookie when someone tries to attempt to avoid client side error.
    res.clearCookie("token");
    res.clearCookie("id");
    const username = (req.body.username).split(" ").join("");
    const pswrd = (req.body.password);
    const findUser = await pool.query(
        "SELECT id, username, password FROM users WHERE username = $1", [username]
    )
    const results = findUser.rows[0];

    if (!results) {
        return res.status(400).send("Invalid Username/Password");
    }
    try {
        if (await bcrypt.compare(pswrd, results.password)) {
            const accessToken = genToken({ id: results.id });
            const refreshToken = jwt.sign({ id: results.id }, process.env.REFRESH_TOKEN_SECRET)
            //! Push token into database!!! 
            const newRefreshToken = await pool.query(
                "UPDATE users SET refresh_token = $1 WHERE id = $2",
                [refreshToken, results.id]
            )
            //! Stash inside cookie
            const newAccessToken = res.cookie("token", accessToken, {
                httpOnly: true
            })
            const current_user = res.cookie("id", results.id, {
                httpOnly: true
            })
            res.json({
                id: results.id
            })
        } else {
            res.send("You did an oopsie");
        }
    } catch (error) {
        res.sendStatus(400)
    }

});

///////////////////////////////
///////////////////////////////
//! LOGOUT
///////////////////////////////
///////////////////////////////
router.post("/logout", async (req, res) => {
    //! Delete token cookie here
    res.clearCookie("token");
    res.clearCookie("id");
    //! Delete refreshtoken from database here 
    const delRefreshToken = await pool.query(
        "UPDATE users SET refresh_token = NULL WHERE id = $1 RETURNING id", [req.body.id]
    )
    res.json(delRefreshToken.rows[0])
});



module.exports = router;