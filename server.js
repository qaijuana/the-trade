//* Dependencies
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser")
const path = require("path");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();
const port = process.env.PORT;
//? Controllers
const login_controller = require("./controllers/login_controller");
const user_controller = require("./controllers/user_controller");
const upload_controller = require("./controllers/upload_controller")
const list_controller = require("./controllers/list_controller")
const image_controller = require("./controllers/image_controller");
const inbox_controller = require("./controllers/inbox_controller")
const likes_controller = require("./controllers/likes_controller");
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

//* Middleware
app.use(cors(corsOptions));
app.use(cookieParser()); //! req.cookie
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' })); //! req.body

//* Controllers
app.use("/api/login", login_controller);
app.use("/api/user", user_controller);
app.use("/api/list", list_controller);
app.use("/api/upload", upload_controller);
app.use("/api/image", image_controller);
app.use("/api/inbox", inbox_controller);
app.use("/api/likes", likes_controller);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
    console.log("we are live on", port, "fm")
})