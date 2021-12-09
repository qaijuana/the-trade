import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router';
import { Form, Row, Col, InputGroup, Button, FloatingLabel, Image } from "react-bootstrap";

function EditProfile(props) {
    const currentUser = props.currentUser;
    const [status, setStatus] = useState("pending");
    const [Base64, setBase64] = useState("");
    const [profile, setProfile] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setProfile([]);
        async function getProfile() {
            console.log("id", id)
            try {
                setStatus("loading")
                const res = await fetch(`/api/user/${id}/profile`)
                const data = await res.json()
                setProfile(data[0])
                console.log(profile)
                setStatus("resolved")
            } catch (error) {
                setStatus("failed")
                console.error(error)
            }

        }
        getProfile();
    }, [currentUser, id])



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
                setStatus("loading")
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
                console.log("Update Response", res)
                navigate(`/user/${id}`);
                // const data = await res.json();
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
        }
        reader.onerror = () => {
            console.error("error")
        }
    }

    return (

        <Form onSubmit={handleSubmit} className="mt-5 nav-duck">

            <Form.Group controlId="formFile" className="mb-3 mx-auto">

                {/* <Image src={Base64 ? Base64 : profile.user_photo} roundedCircle /> */}


                <div
                    className="mx-auto"
                    style={{
                        position: "relative",
                        height: "200px",
                        width: "200px",
                        overflow: 'hidden',
                    }}>
                    <Image
                        src={Base64 ? Base64 : profile.user_photo}
                        className=""
                        style={{
                            position: 'absolute',
                            height: "100%",
                        }}
                    />
                </div>

                <InputGroup>
                    <Form.Control type="file"
                        onChange={handleFile} />
                </InputGroup>
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder={profile.username ? profile.username : "Username"}
                            aria-describedby="inputGroupPrepend"
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={profile.name ? profile.name : "Name"}

                    />

                </Form.Group>
                <Form.Group as={Col} md="4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        defaultValue=""
                        readOnly
                        disabled
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <FloatingLabel controlId="about" label={profile.about ? profile.about : "About"} className="text-muted">
                    <Form.Control
                        as="textarea"
                        placeholder={profile.about ? profile.about : "About"}
                        style={{ height: '100px' }}
                    />
                </FloatingLabel>
            </Row>

            <Button type="submit">Submit</Button>
        </Form>

    );
}

export default EditProfile;

