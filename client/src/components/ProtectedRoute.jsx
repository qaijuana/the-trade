import React from 'react'
import { BrowserRouter as Route, useNavigate } from "react-router-dom";


function ProtectedRoute({ auth, component: Component, ...rest }) {
    const navigate = useNavigate();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth) return <Component {...props} />;
                if (!auth)
                    return (
                        navigate("/", { replace: true })
                    )
            }}
        />
    )
}

export default ProtectedRoute
