import { set } from 'express/lib/application';
import React, { useState, useEffect } from 'react';
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { BsHeart, BsHeartFill, BsFillChatSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router'

import ImageCarousel from './ImageCarousel';

const ListCards = (props) => {
    const {
        img, title, category,
        price, username, date,
        list_id, user_id, currentUser
    } = props;
    const [like, setLike] = useState(false);
    const [like_data, setLike_data] = useState([]);
    const [photos, setPhotos] = useState("");
    const navigate = useNavigate();



    useEffect(() => {
        try {
            async function getPhotos() {
                const res = await fetch(`/api/image/${list_id}`);
                const data = await res.json();
                const result = await data.rows
                if (result.length !== 0) {
                    setPhotos(result)
                }
            }
            getPhotos();
            if (currentUser) {
                try {
                    async function isLiked() {
                        const res = await fetch(`/api/likes/${list_id}`)
                        if (res) {
                            const data = await res.json();
                            if (data.length > 0) {
                                setLike(true);
                                setLike_data(data)
                            }
                        }
                    }
                    isLiked();
                } catch (error) {
                    console.log("likes failed", error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [currentUser])

    function handleLike(event) {
        event.preventDefault();
        if (!currentUser) {
            navigate("/login");
        } else if (like) {
            console.log("deleting")
            async function removeLike() {
                try {
                    const res = await fetch(`/api/likes/${like_data[0].likes_id}`,
                        {
                            method: "DELETE"
                        })
                    console.log(res);
                    setLike(false);
                    console.log("deleted");

                } catch (error) {
                    console.error(error);
                }
            }
            removeLike();
        } else if (!like) {
            try {
                console.log("trying to send db")
                async function addLike() {
                    const res = await fetch(`/api/likes/${list_id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })

                    const data = await res.json();
                    console.log(data)
                    setLike(true);
                }
                addLike();
                console.log("resolved")
            } catch (error) {
                console.log("failed")
                console.error(error);
            }
        }
    }


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

    function handleDate(upload_date) {
        const date_time = upload_date.split("T");
        const now = Date.now();
        const uploaded = (new Date(upload_date)).getTime();
        const difference_seconds = Math.floor((now - uploaded) / 1000)
        const difference_minutes = Math.floor(difference_seconds / 60);
        const difference_hours = Math.floor(difference_minutes / 60);
        const difference_days = Math.floor(difference_hours / 24);
        const difference_weeks = Math.floor(difference_days / 7);
        const difference_years = Math.floor(difference_weeks / 12);

        return (
            <>
                {
                    difference_years ? `${difference_years}y` :
                        difference_weeks ? `${difference_weeks}w` :
                            difference_days ? `${difference_days}w` :
                                difference_hours ? `${difference_hours}h` :
                                    difference_minutes ? `${difference_minutes}m` :
                                        difference_seconds ? `${difference_seconds}s` :
                                            "moments ago"

                }
            </>
        )
    }

    return (

        <Card style={{ width: '18rem', border: "none" }} className="m-2" >
            {/* <Card.Img variant="top" src={(photos) ? photos[0].url : img} /> */}



            <Card.Header className="d-flex justify-content-between">
                <Card.Text className="fs-4">
                    <Button
                        variant="secondary"
                        className="d-flex"
                        onClick={
                            () => {
                                navigate(`/user/${user_id}`)
                            }
                        } >
                        {username}
                    </Button>

                </Card.Text>

                <Card.Text className="text-end">
                    {handleDate(date)}
                    <br />

                </Card.Text>

            </Card.Header>

            <ImageCarousel
                photos={photos}
                defaultPhoto={img}
                list_id={list_id}
                title={title}
            />

            <Card.Body className="d-flex justify-content-between">
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text className="fs-4" >
                    {price}
                </Card.Text>
            </Card.Body >
            <Card.Footer className="">

                {
                    (currentUser !== user_id) ?

                        <ButtonGroup className="mb-2">
                            <Button variant="secondary">Offer</Button>
                            <Button
                                variant="secondary"
                                onClick={
                                    () => {
                                        if (currentUser) {
                                            navigate("/inbox");
                                        } else {
                                            navigate("/login");
                                        }
                                    }
                                } >
                                <BsFillChatSquareFill className="fs-3" />
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={handleLike} >
                                {
                                    (!like) ?
                                        <BsHeart className="fs-4" />
                                        :
                                        < BsHeartFill className="fs-4" />
                                }
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={() => {
                                    navigate(`/list/${list_id}`)
                                }}>
                                More
                            </Button>
                        </ButtonGroup>

                        :

                        <ButtonGroup className="mb-2">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    navigate(`/list/${list_id}`)
                                }}>
                                More
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={
                                    () => {
                                        navigate(`/list/${list_id}/edit`)
                                    }}>
                                Edit
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={(event) => {
                                    handleDelete(event, list_id)
                                }}>
                                Delete
                            </Button>
                        </ButtonGroup>

                }
            </Card.Footer>
        </Card >
    )
}

export default ListCards
