import React from 'react';
import { useParams } from 'react-router';
import { Col, Row, Image, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const UserCard = (props) => {

    const { id } = useParams();
    const { name, username, about, img, user_id, currentUser } = props;



    return (
        <div>
            <div
                className="bg-warning mt-3"
                style={{
                    height: "auto",
                    width: "auto",
                    padding: "40px"
                }}>
                <div className="mt-3 ms-3">
                    <div
                        className=""
                        style={{
                            position: "relative",
                            height: "200px",
                            width: "200px",
                            overflow: 'hidden',
                        }}>
                        <Image
                            className="mx-auto"
                            src={img}
                            style={{
                                position: 'absolute',
                                height: "100%",
                            }}
                        />
                    </div>
                    <div className="mt-2">
                        <h5>hello @{username} {name && `(${name})`} </h5>
                        <p>{about}</p>
                    </div>
                    <div>
                        {
                            (id === currentUser) ?
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    as={Link}
                                    to={`/user/${currentUser}/edit`}
                                >
                                    Edit
                                </Button>
                                :
                                ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
