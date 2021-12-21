import React from 'react';
import { Badge, ListGroup, InputGroup, Form, Button } from "react-bootstrap";

const messages = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit alias velit, est mollitia tenetur corrupti ipsa doloribus perspiciatis fugiat asperiores!"



function Inbox(props) {
    const handleSubmit = props.handleSubmit;
    // const messages = props.messages;

    function MessageReceiver(props) {
        return (
            <div className="">
                <div className="card text-start primary w-75 float-start mt-3">
                    <div className="card-header">
                        Receiver
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                            {messages}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    function MessageSender(props) {
        return (
            <div className="">
                <div className="card w-75 float-end mt-3 ">
                    <div className="card-header">
                        <h6 className="text-end">
                            You
                        </h6>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                            {messages}
                        </p>
                    </div>
                </div>
            </div>

        )
    }
    function ChatList() {
        return (
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Cras justo odio
                </div>
                <Badge variant="primary" pill>
                    14
                </Badge>
            </ListGroup.Item>
        )
    }

    return (
        <>
            <div className=" w-75 mx-auto mt-3 row " >
                <div
                    className="col-3 overflow-scroll noscroll"
                    style={{
                        "height": "75vh",
                        "min-width": "300px"
                    }} >
                    <ListGroup as="ul" >
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                    </ListGroup>
                </div>

                <div className="col ">

                    <div className="border overflow-auto noscroll " style={{ "height": "600px", "min-width": "600px" }}>
                        <div
                            className="bg-light d-flex"
                            style={{
                                "z-index": "1",
                                height: "50px"
                            }}
                        >
                            <h5 className="">
                                Item name
                            </h5>

                        </div>
                        <div
                            style={
                                {
                                    height: "calc(100vh - 40px)",
                                    "padding-top": "40px"
                                }}>
                            <MessageReceiver />
                            <MessageSender />
                            <MessageReceiver />
                            <MessageSender />
                            <MessageReceiver />
                            <MessageSender />
                            <MessageReceiver />
                            <MessageSender />
                            <MessageReceiver />
                            <MessageSender />
                            <MessageReceiver />
                            <MessageSender />
                            <MessageReceiver />
                            <MessageSender />
                            <MessageReceiver />
                            <MessageSender />
                            <MessageSender />
                        </div>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <InputGroup className=" bottom-0 right-0 ">
                            <Form.Control
                                id="messages"
                                as="textarea"
                                placeholder="Say Something"
                                aria-label="Say Something"
                                aria-describedby="basic-addon2"
                                style={{
                                    "height": "50px",
                                    "resize": "none"
                                }}
                            />
                            <Button

                                variant="secondary"
                                id="button-addon2"
                                type="submit">
                                Send
                            </Button>
                        </InputGroup>
                    </Form>

                </div>
            </div>


        </>
    )
}

export default Inbox;
