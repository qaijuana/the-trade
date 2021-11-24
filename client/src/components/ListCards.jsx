import React from 'react';
import { Card, ListGroup, ListGroupItem, Stack } from "react-bootstrap";

const ListCards = (props) => {
    const img = props.img;
    const title = props.title;
    const category = props.category;
    const price = props.price;
    const author = props.author;
    const date = props.date;

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={img} />
            <Stack direction="horizontal" gap={3} className="justify-content-between">
                <Card.Title>@{author}</Card.Title>
                <Card.Text >${price}</Card.Text>
            </Stack>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {date}
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Link href="#">Offer</Card.Link>
                <Card.Link href="#">Message</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default ListCards
