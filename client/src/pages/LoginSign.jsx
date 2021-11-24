import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Form, InputGroup, Button } from "react-bootstrap";

export default function LoginSign(props) {
    const [status, setStatus] = useState("pending");
    const navigate = useNavigate();
    const action = props.action;
    const login = props.login;
    const setCurrentUser = props.setCurrentUser;
    const formRef = useRef();


    function handleSubmit(e) {
        e.preventDefault();
        const username = e?.target?.username?.value;
        const password = e?.target?.password?.value;
        const email = e?.target?.email?.value;
        if (action === "Login") {
            const postLogin = async () => {
                try {
                    setStatus("loading")
                    const res = await fetch("/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password
                        })
                    })
                    const data = await res.json();
                    setCurrentUser(data.id)
                    setStatus("resolved");
                    login();
                    navigate("/");

                } catch (error) {
                    console.log(error)
                }
            }
            console.log(status)
            postLogin();

        } else if (action === "Sign Up") {

            const postSignUp = async () => {
                try {
                    const res = await fetch("/api/user/new", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                            email: email
                        })
                    })
                    // const data = await res.json();
                    navigate("/login");
                    console.log("made it")
                } catch (error) {
                    console.error(error);
                }
            }
            postSignUp();
        }
    }

    return (
        <div>
            <h1>{action}</h1>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control type="text" placeholder="Enter Username" />
                    </InputGroup>
                </Form.Group>

                {(action === "Sign Up") ?
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group> : ""}

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                {(action === "Sign Up") ?
                    <Form.Group className="mb-3 d-flex justify-content-center">
                        <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                        />
                    </Form.Group>
                    :
                    <Form.Group className="mb-3 d-flex justify-content-center" controlId="remember_me">
                        <Form.Check type="checkbox" label="Keep me logged in" />
                    </Form.Group>
                }

                <Button variant="primary" type="submit">
                    {action}
                </Button>
            </Form>

            {/* <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username" />
                <br />
                {(action === "Sign Up") ? <input type="email" name="email" placeholder="email" /> : ""}
                <br />
                <input type="password" name="password" placeholder="password" />
                <br />
                <input type="submit" value={action} />
            </form> */}

        </div>
    )
}

