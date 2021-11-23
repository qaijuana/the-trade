import React, { useState } from 'react';


function useAuth(initialValue, setCurrentUser, currentUser) {
    const [isAuth, setIsAuth] = useState(initialValue);

    function login(e) {
        console.log("login")
        setIsAuth(!isAuth)
    }
    function logout(e) {
        async function delRefreshToken() {
            try {
                const res = await fetch("/api/login/logout", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: currentUser
                    })

                })
                const data = await res.json();
                console.log(data)


            } catch (error) {
                console.error(error)
            }
        }
        delRefreshToken();
        console.log("logout")
        setCurrentUser(null)
        setIsAuth(!isAuth)

    }
    return [isAuth, login, logout]
}

export default useAuth
