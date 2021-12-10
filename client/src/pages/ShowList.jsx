import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Card, ButtonGroup, Button } from 'react-bootstrap';
import { BsAt, BsHeart, BsHeartFill, BsFillChatSquareFill } from "react-icons/bs";
import { useParams } from 'react-router';

const ShowList = (props) => {
    const { id } = useParams();
    const [listInfo, setListInfo] = useState([])
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
                console.log(data)
            } catch (error) {
                console.error(error);
                navigate("/marketplace")
            }
        }
        getList();
    }, [])

    if (listInfo.length === 0)
        return (
            <h1>LOADING</h1>
        )

    return (
        <Container>


            <Card.Img variant="top" src={listInfo && listInfo.url ? listInfo.url : listInfo.list_images} />


            <Card className="mt-4" >
                <Card.Header className="d-flex justify-content-between">
                    <Card.Text className="fs-4">
                        <Button variant="secondary" className="d-flex" onClick={handleUser}>
                            <BsAt />
                            {listInfo.username}
                        </Button>

                    </Card.Text>
                    <Card.Text>
                        {listInfo.upload_date}
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
