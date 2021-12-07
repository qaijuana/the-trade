import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router';
import { Form, Row, Col, InputGroup, Button, FloatingLabel, Image } from "react-bootstrap";
import { Image as ImageCloud, Transformation } from "cloudinary-react";

function EditProfile(props) {
    const [validated, setValidated] = useState(false);
    const [status, setStatus] = useState("pending");
    const [displayImage, setDisplayImage] = useState("");
    const [userPhoto, setUserPhoto] = useState();
    const [userInfo, setUserInfo] = useState({});
    const [Base64, setBase64] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/w_300,h_300`;


    const handleSubmit = (event) => {
        event.preventDefault();
        // event.stopPropagation();
        const username = event?.target?.username?.value;
        const password = event?.target?.password?.value;
        const email = event?.target?.email?.value;
        const name = event?.target?.name?.value;
        const about = event?.target?.about?.value;
        console.log(username, password, email, name, about)

        async function updateUser() {
            try {
                const res = await fetch(`/api/user/${id}/edit`, {
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
                        files: Base64
                    })
                })
                navigate(`/user/${id}`);
                const data = await res.json();
            } catch (error) {
                console.error(error)
            }

        }
        updateUser();
    };


    function handleFile(event) {
        event.preventDefault();
        const files = event.target.files
        const file = files[0];
        //! Convert to Base64 String
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setBase64(reader.result)
            console.log(Base64);
        }
        reader.onerror = () => {
            console.error("error")
        }
    }

    return (

        <Form onSubmit={handleSubmit} className="mt-5">

            <Form.Group controlId="formFile" className="mb-3">
                {
                    Base64 ?
                        <Image src={Base64} roundedCircle />
                        :
                        <Image src={userInfo.user_photo} roundedCircle />
                }
                <InputGroup>
                    <Form.Control type="file"
                        onChange={handleFile} />
                    {/* <Button variant="primary" id="button-addon2" onClick={handleUpload}>
                        Upload
                    </Button> */}
                </InputGroup>
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="username"
                            aria-describedby="inputGroupPrepend"
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"

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

