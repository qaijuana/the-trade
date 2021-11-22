import React, { useState } from 'react';
import { Image, Transformation } from "cloudinary-react";

const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`

function ProfileEdit(props) {
    const [uploadInfo, setUploadInfo] = useState("");
    const [status, setStatus] = useState("pending");
    const [displayImage, setDisplayImage] = useState("");

    function handleUpload(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", uploadInfo)
        formData.append("upload_preset", "ofd7rhpu")

        const sendCloudinary = async () => {
            setStatus("Loading");
            try {
                const res = await fetch(url, {
                    method: "POST",
                    body: formData
                })
                const data = await res.json();
                console.log("Data", data)
                setDisplayImage(data)
                setStatus("resolved")
            } catch (error) {
                console.error(error)
            }
            console.log(status)
        }
        sendCloudinary();
    }

    return (
        <div className="profile-form">
            <h1>Edit Profile</h1>
            <div className="image-card">
                <Image cloudName={process.env.REACT_APP_CLOUD_NAME}
                    publicId={displayImage ? displayImage.public_id : ""} >
                    <Transformation height="300" width="300" crop="fill" />
                </Image>
                <input type="file" onChange={(event) => { setUploadInfo(event.target.files[0]) }} />
                <button onClick={handleUpload}>Upload</button>
                {uploadInfo ?
                    //! Convert bytes to Megabytes
                    <h6>
                        {Math.round(uploadInfo.size / 1000000)}MB
                    </h6> :
                    ""}
            </div>

            <label htmlFor="username">Username</label>
            <input type="text" name="username" />
            <br />
            <label htmlFor="email">email</label>
            <input type="text" name="email" />
            <br />
            <label htmlFor="password">password</label>
            <input type="text" name="password" />
            <br />
            <label htmlFor="about">field</label>
            <input type="textfield" name="about" />

        </div>
    )
}

export default ProfileEdit
