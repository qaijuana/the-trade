import React from 'react';
import { Modal, Button, InputGroup, FormControl, Form, Image } from 'react-bootstrap';

function MyModal(props) {
    const { data, photos } = props;
    console.log(data)


    return (
        <Form>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <div
                        className="mx-2"
                        style={{
                            position: "relative",
                            height: "100px",
                            width: "100px",
                            overflow: 'hidden'
                        }}>
                        <Image
                            src={photos ? photos[0].url : data.img}
                            style={{
                                position: 'absolute',
                                height: "100%",
                            }}
                        />
                    </div>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {data.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <FormControl type="number" id="offer_price" step=".05" aria-label="Dollar amount (with dot and two decimal places)" />
                        <InputGroup.Text>{data.price}</InputGroup.Text>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" onClick={() => { console.log("offering") }}>
                        Offer
                    </Button>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >
        </Form>
    );
}

export default MyModal