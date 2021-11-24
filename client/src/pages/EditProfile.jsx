import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Form, Row, Col, InputGroup, Button, FloatingLabel, Image } from "react-bootstrap";
import { Image as ImageCloud, Transformation } from "cloudinary-react";

function EditProfile(props) {
    const [validated, setValidated] = useState(false);
    const [status, setStatus] = useState("pending");
    const [displayImage, setDisplayImage] = useState("");
    const [userPhoto, setUserPhoto] = useState();
    const [userInfo, setUserInfo] = useState({});
    const currentUser = props.currentUser;
    const { id } = useParams();
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/w_300,h_300`;


    function handleUpload(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", userPhoto)
        formData.append("upload_preset", "ofd7rhpu")

        const sendCloudinary = async () => {
            setStatus("Loading");
            try {
                const res = await fetch(cloudinaryUrl, {
                    method: "POST",
                    body: formData
                })
                const data = await res.json();
                setDisplayImage(data);
                try {
                    const sendProfilePhoto = await fetch(`/api/user/${id}/edit`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ user_photo: data.url })
                    })
                } catch (error) {
                    setStatus("failed");
                    console.error(error);
                }
                setStatus("resolved");
            } catch (error) {
                setStatus("failed");
                console.error(error)
            }
            console.log(status)
        }
        sendCloudinary();
    }


    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${id}`)
                const data = await res.json();
                console.log("DATA", data)
                setUserInfo(data);
            } catch (error) {
                console.error(error)
            }
        }
        getUser();
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const username = event?.target?.username?.value;
        const password = event?.target?.password?.value;
        const email = event?.target?.email?.value;
        const name = event?.target?.name?.value;
        const about = event?.target?.about?.value;
        console.log(username, password, email, name, about)
        async function updateUser() {
            const res = await fetch(`/api/user/${currentUser}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    username: username,
                    email: email,
                    password: password,
                    about: about,
                })
            })
            const data = await res.json();
        }
        updateUser();
    };

    function CloudinaryDisplay() {
        return (
            <ImageCloud cloudName={process.env.REACT_APP_CLOUD_NAME}
                publicId={displayImage.public_id} >
                <Transformation height="300" width="300" crop="fill" />
            </ImageCloud>
        )
    }

    return (

        <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-5">

            <Form.Group controlId="formFile" className="mb-3">
                {displayImage ?
                    <Image as={CloudinaryDisplay} roundedCircle />
                    :
                    <Image src={userInfo.user_photo} roundedCircle />}
                {/* <Form.Label>Default file input example</Form.Label> */}

                <InputGroup>
                    <Form.Control type="file"
                        onChange={(event) => { setUserPhoto(event.target.files[0]) }} />
                    <Button variant="outline-secondary" id="button-addon2" onClick={handleUpload}>
                        Upload
                    </Button>
                </InputGroup>
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder={userInfo?.username}
                            aria-describedby="inputGroupPrepend"
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        defaultValue={userInfo?.name}
                    />

                </Form.Group>
                <Form.Group as={Col} md="4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        defaultValue=""
                        readOnly
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <FloatingLabel controlId="about" label="About me" className="text-muted">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                    />
                </FloatingLabel>
            </Row>

            <Button type="submit">Submit</Button>
        </Form>

    );
}

export default EditProfile;

