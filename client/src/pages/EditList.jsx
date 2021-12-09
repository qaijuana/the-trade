import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router';
import { Form, Col, Row, FloatingLabel, InputGroup, Button, Image } from "react-bootstrap";


function EditList(props) {
    const [status, setStatus] = useState("pending");
    const [Base64, setBase64] = useState("");
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const currentUser = props.currentUser;
    console.log("id, currentUser", id, currentUser)

    useEffect(() => {
        async function getList() {
            setStatus("loading");
            try {
                const res = await fetch(`/api/list/${id}`);
                const data = await res.json();
                setList(data);
                console.log("list state", list);
                setStatus("resolved");

            } catch (error) {
                setStatus("failed");
                console.error(error);
            }
        }
        getList();
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        const currentUser = props.currentUser;
        const title = event?.target?.title?.value
        const price = event?.target?.price?.value
        const category = event?.target?.category?.value
        const condition = event?.target?.condition?.value
        const description = event?.target?.description?.value


        async function updateList() {
            setStatus("loading")
            try {
                setStatus("loading");
                const resDb = await fetch(`/api/list/${id}/edit`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: title,
                        price: price,
                        category: category,
                        condition: condition,
                        description: description,
                        user_id: currentUser,
                        files: Base64,
                    })
                })
                const statusDb = resDb.ok;
                if (statusDb) {
                    setStatus("resolved");
                    navigate(`/user/${currentUser}`)
                }
            } catch (error) {
                //! Catching errors for database
                console.log("Edit list failed")
                console.error(error);
            }
        }
        updateList();
    }

    function handleFile(event) {
        event.preventDefault();
        const files = event.target.files
        const file = files[0];
        //! Convert to Base64 String
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setBase64(reader.result)
        }
        reader.onerror = () => {
            console.error("error")
        }
    }


    return (
        <div>
            <h1>
                edit
            </h1>
            <Form noValidate onSubmit={handleSubmit} >

                <Form.Group controlId="list_images" className="mb-3">
                    <div
                        className="mx-auto"
                        style={{
                            position: "relative",
                            height: "200px",
                            width: "200px",
                            overflow: 'hidden',
                        }}>
                        <Image
                            src={Base64 ? Base64 : list.url}
                            className=""
                            style={{
                                position: 'absolute',
                                height: "100%",
                            }}
                        />
                    </div>
                    <InputGroup>
                        <Form.Control type="file"
                            onChange={handleFile} />
                    </InputGroup>
                </Form.Group>

                <Row className="g-2 mb-3">
                    <Col md>
                        <Form.Group>
                            <FloatingLabel controlId="title" label="Title">
                                <Form.Control
                                    type="text" placeholder="Product Name"
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">
                                Please provide a title for the product.
                            </Form.Control.Feedback>

                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group>
                            <InputGroup hasValidation>
                                <InputGroup.Text>$</InputGroup.Text>
                                <FloatingLabel controlId="price" label="Price">
                                    <Form.Control
                                        type="number"
                                        min="1" step="any"
                                        placeholder="Price"
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a price.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>

                </Row>

                <Row className="g-2 mb-3">
                    <Col md>
                        <FloatingLabel controlId="condition" label="Select Condition">
                            <Form.Select aria-label="condition">
                                <option></option>
                                <option value="1">New</option>
                                <option value="2">Mint</option>
                                <option value="3">Well Used</option>
                                <option value="4">In Stock</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>

                    <Col md>
                        <FloatingLabel controlId="category" label="Select Category">
                            <Form.Select aria-label="category">
                                <option></option>
                                <option value="1">Home & Living</option>
                                <option value="2">Electronics</option>
                                <option value="3">Music</option>
                                <option value="4">Photography</option>
                                <option value="5">Jobs</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>

                <FloatingLabel controlId="description" label="Description" className="text-muted mb-3">
                    <Form.Control
                        as="textarea"
                        placeholder="Tell us about what you're selling"
                        style={{ height: '100px' }}
                    />
                </FloatingLabel>
                <div className="d-grid gap-2">
                    <Button variant="secondary" size="lg" type="submit" >
                        Edit
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default EditList
