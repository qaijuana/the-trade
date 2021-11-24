import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    const currentUser = props.currentUser;
    const logout = props.logout;
    

    return (
        <div className="header">
            <div className="header-1">
                <Link to={"/"}>Home</Link>
                <Link to={"/marketplace"}>Shop</Link>
            </div>
            <div className="header-2">
                {
                    (!currentUser) ?
                        <>
                            <Link to={"/learn"}>Learn</Link>
                            <Link to={"/signup"}>Sign Up</Link>
                            <Link to={"/login"} >Login</Link>
                        </>
                        :
                        <>

                            <Link to={"/create"}>Add</Link>
                            <Link to={"/inbox"}>Inbox</Link>
                            <Link to={"/user/" + currentUser}>Profile</Link>
                            <Link to={"/"} onClick={logout}>Logout</Link>
                        </>
                }
            </div>

        </div>

    )
}

export default NavBar
