import React, { useState } from 'react';


function useAuth(initialValue, setCurrentUser, currentUser) {
    const [isAuth, setIsAuth] = useState(initialValue);

    // LOGIN 
    function login(e) {
        setIsAuth(!isAuth)
        console.log("login")
    }

    //! LOGOUT 
    function logout(e) {
        async function delRefreshToken() {
            try {
                const res = await fetch("/api/login/logout", {
                    method: "POST",
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
