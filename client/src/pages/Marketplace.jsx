import React from 'react'

const Marketplace = () => {
    return (
        <div className="test">
            <h1>
                {title}
            </h1>
            {(title === "marketplace") ? <Cards /> : ""}
        </div>
    )
}

export default Marketplace
