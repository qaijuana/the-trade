const express = require("express");
const inbox = express.Router();

const pool = require("../database");
const authToken = require("./authToken");

inbox.get("/", (req, res) => {
    res.sendStatus(200);
})

inbox.get("/:id", (req, res) => {
    const { id } = req.params;
    res.json(id);
})

inbox.post("/new", (req, res) => {
    const { id } = req.cookies;
})

module.exports = inbox;