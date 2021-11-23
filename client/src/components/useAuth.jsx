import { useState } from 'react'

function useAuth(initialValue) {
    const [isAuth, setIsAuth] = useState(initialValue);

    async function login(e) {
        
        console.log("login")
        setIsAuth(!isAuth)
    }
    function logout(e) {
        console.log("logout")
        setIsAuth(!isAuth)
    }
    return [isAuth, login, logout]
}

export default useAuth
