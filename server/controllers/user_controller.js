const bcrypt = require("bcrypt");
const express = require("express");
const router = require("router");


// create

router.post("/new", (req, res) => {
    console.log(req)
    res.json("lol")
})

// show all

router.get("/show", (req, res) => {
    console.log(req, res)
    res.json("lol");
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