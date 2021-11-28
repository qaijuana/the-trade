import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router';
import { Form, Col, Row, FloatingLabel, InputGroup, Button } from "react-bootstrap";


function EditList(props) {
    const [status, setStatus] = useState("pending");
    const navigate = useNavigate();
    const { id } = useParams();
    const currentUser = props.currentUser;

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
                    })
                })
                const dataDb = resDb.json();
                const statusDb = resDb.ok;
                console.log(dataDb, statusDb)
                setStatus("resolved");
                navigate(`/user/${currentUser}`)

            } catch (error) {
                //! Catching errors for database
                console.error(error);
            }
        }
        updateList();
    }


    return (
        <div>
            <h1>
                edit
            </h1>
            <Form noValidate onSubmit={handleSubmit} >
                {/* <Form.Group controlId="list_images" className="mb-3"> */}
                {/* {displayImage ? */}
                {/* // <Image as={CloudinaryDisplay} roundedCircle /> */}
                {/* // : */}
                {/* // <Image src="" roundedCircle />} */}
                {/* <Form.Label>Select Photos</Form.Label> */}
                {/* <InputGroup> */}
                {/* <Form.Control type="file" */}
                {/* // onChange={(event) => { setListPhoto(event.target.files[0]) }} /> */}
                {/* <Button variant="outline-secondary" id="button-addon2" onClick={handleUpload}>
                            Upload
                        </Button> */}
                {/* </InputGroup> */}
                {/* </Form.Group> */}

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
