import React, { useState } from "react";
import { Carousel } from "react-bootstrap";


function ImageCarousel(props) {
    const photos = props.photos
    const defaultPhoto = props.defaultPhoto;
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };



    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>

            {
                photos ?

                    photos.map((e, i) => {
                        return (
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={e.url}
                                    alt=""
                                />

                            </Carousel.Item>
                        )
                    })

                    :
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={defaultPhoto}
                            alt=""
                        />

                    </Carousel.Item>


            }

        </Carousel>
    );
}

export default ImageCarousel;