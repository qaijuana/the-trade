const express = require("express");
const router = express.Router();
const pool = require("../database")
const jwt = require("jsonwebtoken")


function authToken(req, res, next) {
    const { cookies } = req
    const { token, id } = cookies;

    if (!token) return res.sendStatus(401);
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        })

    } catch (error) {
        res.clearCookie("token");
        res.clearCookie("id")
        console.error(error);
        res.sendStatus(403);
    }

}

module.exports = authToken

