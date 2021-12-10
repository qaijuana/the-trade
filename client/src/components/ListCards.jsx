import React, { useState, useEffect } from 'react';
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { BsAt, BsHeart, BsHeartFill, BsFillChatSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router'

import ImageCarousel from './ImageCarousel';

const ListCards = (props) => {
    const [like, setLike] = useState(false);
    const [photos, setPhotos] = useState("");
    const { img, title, category, price, username, date, list_id, user_id, url, currentUser } = props;
    const navigate = useNavigate();

    useEffect(() => {
        async function getPhotos() {
            const res = await fetch(`/api/image/${list_id}`);
            const data = await res.json();
            const result = await data.rows
            if (result.length !== 0) {
                setPhotos(result)
                console.log("result", result)
            }
        }
        getPhotos();
    }, [])



    function handleDelete(event, list_id) {
        event.preventDefault();
        async function deleteList() {
            try {
                const delete_list = fetch(`/api/list/${list_id}`, {
                    method: "DELETE"
                })
                navigate(`/user/${user_id}`)
            } catch (error) {
                console.error(error);
            }
        }
        deleteList();

    }


    return (

        <Card style={{ width: '18rem', border: "none" }} className="m-2" >
            {/* <Card.Img variant="top" src={(photos) ? photos[0].url : img} /> */}

            <ImageCarousel photos={photos} defaultPhoto={img} />


            <Card.Header className="d-flex justify-content-between">
                <Card.Text className="fs-4">
                    <Button variant="secondary" className="d-flex" onClick={() => { navigate(`/user/${user_id}`) }}>
                        <BsAt /> {username}
                    </Button>

                </Card.Text>
                <Card.Text>
                    {date}
                </Card.Text>
            </Card.Header>
            <Card.Body className="d-flex justify-content-between">
                <Card.Title>{title}</Card.Title>
                <Card.Text className="fs-4" >
                    {price}
                </Card.Text>
            </Card.Body >
            <Card.Footer>
                {(currentUser !== user_id) ?

                    <ButtonGroup size="" className="mb-2">
                        <Button variant="secondary">Offer</Button>
                        <Button variant="secondary" onClick={() => { navigate("/inbox") }}><BsFillChatSquareFill className="fs-3" /></Button>
                        <Button variant="secondary" onClick={() => { setLike(!like) }}>
                            {(!like) ?
                                <BsHeart className="fs-4" />
                                :
                                < BsHeartFill className="fs-4" />
                            }
                        </Button>
                        <Button stretched-link variant="secondary" onClick={() => { navigate(`/list/${list_id}`) }}>
                            More
                        </Button>
                    </ButtonGroup>

                    :

                    <ButtonGroup size="" className="mb-2">
                        <Button variant="secondary" onClick={() => { navigate(`/list/${list_id}/`) }}>
                            More
                        </Button>
                        <Button onClick={() => { navigate(`/list/${list_id}/edit`) }} variant="secondary">
                            Edit
                        </Button>
                        <Button
                            onClick={(event) => { handleDelete(event, list_id) }}
                            variant="secondary">
                            Delete
                        </Button>
                    </ButtonGroup>

                }
            </Card.Footer>
        </Card >
    )
}

export default ListCards
