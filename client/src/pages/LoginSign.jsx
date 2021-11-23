import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function LoginSign(props) {

    const [status, setStatus] = useState("pending");
    const navigate = useNavigate();
    const Action = props.action;
    const Login = props.login;
    const setCurrentUser = props.setCurrentUser;

    function handleSubmit(e) {
        e.preventDefault();
        const username = e?.target?.username?.value;
        const password = e?.target?.password?.value;
        const email = e?.target?.email?.value;
        if (Action === "Login") {
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
                    console.log("data", data)
                    setStatus("resolved");
                    Login();
                    navigate("/");

                } catch (error) {
                    console.log(error)
                }
            }
            console.log(status)
            postLogin();
        } else if (Action === "Sign Up") {
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
                    const data = await res.json();
                    console.log(data)
                    navigate("/login");
                } catch (error) {
                    console.error(error);
                }
            }
            postSignUp();
        }
    }

    return (
        <div>
            <h1>{Action}</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username" />
                <br />
                {(Action === "Sign Up") ? <input type="email" name="email" placeholder="email" /> : ""}
                <br />
                <input type="password" name="password" placeholder="password" />
                <br />
                <input type="submit" value={Action} />
            </form>

        </div>
    )
}

