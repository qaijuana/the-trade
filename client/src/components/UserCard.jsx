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
        <Col className=" bg-warning mt-3  " style={{ height: "600px" }}>



                <Row className="w-75 mx-auto">
                    <Image
                        className="img-thumbnail mt-3"
                        src={img}
                        roundedCircle
                         />
                </Row>

                <Row>
                    <h3>hello, @{username} ({name})</h3>
                    <h3>{about}</h3>
                </Row>

                <Row>
                    {
                        (id === currentUser) ?
                            <Button
                                size="lg"
                                variant="secondary"
                                as={Link}
                                to={`/user/${user_id}/edit`}
                            >
                                Edit
                            </Button>
                            :
                            ""
                    }
                </Row>
            </Col>
    )
}

export default UserCard
