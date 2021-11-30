import React, { useState } from 'react';
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { BsAt, BsHeart, BsHeartFill, BsFillChatSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router'


const ListCards = (props) => {
    const [like, setLike] = useState(false);
    const img = props.img;
    const title = props.title;
    const category = props.category;
    const price = props.price;
    const author = props.author;
    const date = props.date;
    const list_id = props.list_id;
    const user_id = props.user_id;
    const typeoflist = props.typeoflist;
    const navigate = useNavigate();

    function handleDelete(event, list_id) {
        console.log(event, list_id)
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
            <Card.Img variant="top" src={img} />
            <Card.Header className="d-flex justify-content-between">
                <Card.Text className="fs-4">
                    <Button variant="secondary" className="d-flex" onClick={() => { navigate(`/user/${user_id}`) }}>
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
                {(!typeoflist) ?

                    <ButtonGroup size="" className="mb-2">
                        <Button variant="secondary">Offer</Button>
                        <Button variant="secondary" onClick={()=>{ navigate("/inbox")}}><BsFillChatSquareFill className="fs-3" /></Button>
                        <Button variant="secondary" onClick={() => { setLike(!like) }}>
                            {(!like) ?
                                <BsHeart className="fs-4" />
                                :
                                < BsHeartFill className="fs-4" />
                            }
                        </Button>
                        <Button variant="secondary" onClick={() => { navigate(`/list/${list_id}`) }}> More </Button>
                    </ButtonGroup>

                    :

                    <ButtonGroup size="" className="mb-2">
                        <Button variant="secondary" onClick={() => { navigate(`/list/${list_id}`) }}> More </Button>
                        <Button onClick={() => { navigate(`/list/${list_id}/edit`) }} variant="secondary">
                            Edit
                        </Button>
                        <Button onClick={(event) => { handleDelete(event, list_id) }} variant="secondary">
                            Delete
                        </Button>
                    </ButtonGroup>

                }
            </Card.Footer>
        </Card >
    )
}

export default ListCards
