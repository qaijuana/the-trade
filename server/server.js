//* Dependencies
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT
const login_controller = require("./controllers/login_controller");

//* Middleware
app.use(express.static(path.join(__dirname, "./client")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //! req.body

//* Controllers
app.use("/api/login", login_controller);


app.listen(port, () => {
    console.log("we are live on", port, "fm")
})