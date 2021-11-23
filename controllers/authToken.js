const express = require("express");
const router = express.Router();
const pool = require("../database")
const jwt = require("jsonwebtoken")


function authToken(req, res, next) {
    // const authHeader = req.headers['authorization'];
    //! if authHeader is true (&&) then authHeader.split will be done
    // const token = authHeader && authHeader.split(" ")[1];
    const { cookies } = req
    const token = cookies.token
    console.log("token", token)

    if (token == null) return res.sendStatus(401)
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            console.log(req.user);
            next();
        })

    } catch (error) {
        res.clearCookie("token");
        console.error(error);
    }

}

module.exports =  authToken

