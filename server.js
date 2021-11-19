//* Dependencies
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT;
const login_controller = require("./controllers/login_controller");
const user_controller = require("./controllers/user_controller");
const list_controller = require("./controllers/list_controllers");

//* Middleware
app.use(express.static(path.join(__dirname, "./client")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //! req.body

//* Controllers
app.use("/api/login", login_controller);
app.use("/api/user", user_controller);
app.use("/api/list", list_controller);


app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
    console.log("we are live on", port, "fm")
})