import React from 'react';
import { Col, Row, Image, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const UserCard = (props) => {
    // style={{ width: '18rem' }}
    const name = props.name;
    const username = props.username;
    const about = props.about;
    const img = props.img;

    return (
        <div className="bg-warning mt-3" style={{ height: "750px" }}>


            <Image className="img-thumbnail float-right" src={img} roundedCircle />


            <Col>
                <h1>hello, @{username}</h1>
                <h1>{about}</h1>
            </Col>
            <Button size="lg" variant="secondary">Edit</Button>
        </div>
    )
}

export default UserCard
