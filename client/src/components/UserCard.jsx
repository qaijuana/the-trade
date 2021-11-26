import React from 'react';
import { Col, Row, Image, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const UserCard = (props) => {
    // style={{ width: '18rem' }}
    const name = props.name;
    const username = props.username;
    const about = props.about;
    const img = props.img;
    const user_id = props.user_id;
    const id = props.id;
    const currentUser = props.currentUser;


    return (
        <div className="bg-warning mt-3" style={{ height: "750px" }}>


            <Image className="img-thumbnail float-right mt-3" src={img} roundedCircle />
            <Col>
                <h1>hello, @{username} ({name})</h1>
                <h1>{about}</h1>
            </Col>
            {
                (id === currentUser) ?
                    <Button size="lg" variant="secondary"
                        as={Link} to={`/user/${user_id}/edit`}
                    >Edit</Button>

                    : ""
        }
        </div>
    )
}

export default UserCard
