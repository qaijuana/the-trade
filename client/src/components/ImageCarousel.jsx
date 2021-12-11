import React, { useState } from "react";
import { Carousel } from "react-bootstrap";


function ImageCarousel(props) {
    const { photos, defaultPhoto, list_id, title } = props;
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };



    return (
        <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            interval={null}
        >

            {
                photos ?
                    photos.map((e, i) => {
                        return (
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={e.url}
                                    alt={`TIPS marketplace: ${title}`}
                                    key={list_id}
                                />

                            </Carousel.Item>
                        )
                    })
                    :
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={defaultPhoto}
                            alt={`TIPS marketplace: ${title}`}
                        />
                    </Carousel.Item>


            }

        </Carousel>
    );
}

export default ImageCarousel;