const { application } = require("express");
const express = require("express");
const router = express.Router();
const { cloudinary } = require("../utils/cloudinary")

router.post("/", async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary
            .uploader
            .upload(fileStr, {
                upload_preset: "dev_setups"
            })
        console.log(uploadedResponse);
        res.json({ msg: "lmao" })
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})

module.exports = router;