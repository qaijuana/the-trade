//* Dependencies
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser")
const path = require("path");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();
const port = process.env.PORT;
const login_controller = require("./controllers/login_controller");
const user_controller = require("./controllers/user_controller");
const upload_controller = require("./controllers/upload_controller")
const list_controller = require("./controllers/list_controller")
const image_controller = require("./controllers/image_controller");
const authToken = require("./controllers/authToken");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const whitelist = [
    "http://localhost:3000",
    `https://api.cloudinary.com/v1_1/dmd2jnxn3/image/upload/w_300,h_300`

];
const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true);

    },
};

// all routes are now exposed, 
// sometimes you just want to limit access 
// (ie OMDB - it's ok for anyone to see the movies, 
// but you don't want just anyone updating the movies)
app.use(cors(corsOptions));

//* Middleware
app.use(cookieParser()); //! req.cookie
app.use(express.static(path.join(__dirname, "./client")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //! req.body

//* Controllers
app.use("/api/login", login_controller);
app.use("/api/user", user_controller);
app.use("/api/list", list_controller);
app.use("/api/upload", upload_controller);
app.use("/api/lists", list_controller);
app.use("/api/image", image_controller);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
    console.log("we are live on", port, "fm")
})