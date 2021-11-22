import React, { useState } from 'react'

export default function LoginSign({ action: Action }, ...rest) {

    const [status, setStatus] = useState("pending");

    function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        if (Action === "Login") {
            // console.log(username, password)
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
                    setStatus("resolved");
                } catch (error) {
                    console.error(error)
                }
            }
            console.log(status)
            postLogin();
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

