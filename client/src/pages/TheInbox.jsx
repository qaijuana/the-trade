import React, { useState, useEffect } from 'react'
import Inbox from "../components/Inbox"


function TheInbox(props) {
    const [messages, setMessages] = useState([]);


    function handleSubmit(e) {
        e.preventDefault();
        console.log("hello", e.target.messages.value)
    }

    return (
        <div className="inbox">
            <Inbox
                messages={messages}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}



export default TheInbox

