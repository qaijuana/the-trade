import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Card, ButtonGroup, Button } from 'react-bootstrap';
import { BsAt, BsHeart, BsHeartFill, BsFillChatSquareFill } from "react-icons/bs";
import { useParams } from 'react-router';
import ImageCarousel from '../components/ImageCarousel';

const ShowList = (props) => {
    const { id } = useParams();
    const [listInfo, setListInfo] = useState([])
    const [photos, setPhotos] = useState("");
    const navigate = useNavigate();
    const [like, setLike] = useState(false);


    function handleUser() {
        navigate(`/user/${listInfo.user_id}`)
    }

    useEffect(() => {
        const getList = async () => {
            try {
                const res = await fetch(`/api/list/${id}`)
                const data = await res.json();
                setListInfo(data);
                try {
                    async function getPhotos() {
                        const res = await fetch(`/api/image/${id}`);
                        const data = await res.json();
                        const result = await data.rows
                        if (result.length !== 0) {
                            setPhotos(result)
                        }
                    }
                    getPhotos();
                } catch (error) {
                    console.error(error)
                }
            } catch (error) {
                console.error(error);
                navigate("/marketplace")
            }
        }
        getList();
    }, [])

    function handleDate(upload_date) {
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
                    difference_weeks >= 52 ? `${difference_years}y` :
                        difference_days >= 7 ? `${difference_weeks}w` :
                            difference_hours >= 24 ? `${difference_days}d` :
                                difference_minutes >= 60 ? `${difference_hours}h` :
                                    difference_seconds >= 60 ? `${difference_minutes}m` :
                                        "moments ago"

                }
            </>
        )
    }

    if (listInfo.length === 0)
        return (
            <h1>LOADING</h1>
        )

    return (

        <Container>


            {/* <Card.Img variant="top" src={listInfo && listInfo.url ? listInfo.url : listInfo.list_images} /> */}

            <ImageCarousel
                photos={photos}
                defaultPhoto={listInfo.list_images} />

            <Card className="mt-4" >
                <Card.Header className="d-flex justify-content-between">
                    <Card.Text className="fs-4">
                        <Button variant="secondary" className="d-flex" onClick={handleUser}>
                            <BsAt />
                            {listInfo.username}
                        </Button>

                    </Card.Text>
                    <Card.Text>
                        {handleDate(listInfo.upload_date)}
                    </Card.Text>
                </Card.Header>
                <Card.Body className="d-flex justify-content-between">
                    <Card.Title>{listInfo.title}</Card.Title>
                    <Card.Text className="fs-4" >
                        {listInfo.price}
                    </Card.Text>
                </Card.Body >
                <Card.Body>
                    <Card.Text className="fs-4" >
                        {listInfo.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <ButtonGroup size="lg" className="mb-2">
                        <Button variant="secondary">Offer</Button>
                        <Button variant="secondary">
                            <BsFillChatSquareFill className="fs-3" />
                        </Button>
                        <Button variant="secondary" onClick={() => { setLike(!like) }}>
                            {(!like) ?
                                <BsHeart className="fs-4" />
                                :
                                < BsHeartFill className="fs-4" />
                            }
                        </Button>
                    </ButtonGroup>
                </Card.Footer>
            </Card >


        </Container>
    )
}

export default ShowList
