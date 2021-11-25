import React from 'react';
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { BsCurrencyDollar, BsAt, BsHeart, BsHeartFill, BsFillChatSquareFill } from "react-icons/bs";

import { Link } from 'react-router-dom';


const ListCards = (props) => {
    const img = props.img;
    const title = props.title;
    const category = props.category;
    const price = props.price;
    const author = props.author;
    const date = props.date;
    const onClick = props.onClick;
    const onUser = props.onUser;

    return (
        <Card style={{ width: '18rem' }} >
            <Card.Img variant="top" src={img} />
            <Card.Header className="d-flex justify-content-between">
                <Card.Text className="fs-4">
                    <Button variant="secondary" className="d-flex" onClick={onUser}>
                        <BsAt /> {author}
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
                <ButtonGroup size="" className="mb-2">
                    <Button variant="secondary">Offer</Button>
                    <Button variant="secondary"><BsFillChatSquareFill className="fs-3" /></Button>
                    <Button variant="secondary"> <BsHeart className="fs-4" /> </Button>
                    <Button variant="secondary" onClick={onClick}> More </Button>
                </ButtonGroup>
            </Card.Footer>
        </Card >
    )
}

export default ListCards
