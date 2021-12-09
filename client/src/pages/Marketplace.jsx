import React, { useEffect, useState } from 'react';
import { Row } from "react-bootstrap"
import ListCards from '../components/ListCards';
// import { useNavigate } from 'react-router';


const Marketplace = (props) => {

    const [allList, setAllList] = useState([]);
    // const navigate = useNavigate();

    useEffect(() => {
        const getLists = async () => {
            try {
                const res = await fetch("/api/list");
                const data = await res.json();
                setAllList(data);
            } catch (error) {
                console.error(error);
            }
        }
        getLists();
    }, [])

    console.log(allList);

    if (allList.length === 0) {
        return (
            <h1 className="text-center">
                Loading
            </h1>
        )
    }
    if (allList.length !== 0)
        return (
            <div
                className=''>
                <h1 className="text-center">
                    Marketplace
                </h1>
                <div className="d-flex flex-wrap mt-3 overflow-scroll noscroll ">

                    {
                        allList.map((e, i) => {
                            console.log(e)
                            if (e.price)
                                return (
                                    <ListCards
                                        img={e.list_images}
                                        title={e.title}
                                        category={e.category}
                                        price={e.price}
                                        username={e.username}
                                        date={e.upload_date}
                                        user_id={e.user_id}
                                        list_id={e.listings_id}
                                        url={e.url}
                                    />
                                )

                        })
                    }
                </div>
            </div>
        )
}

export default Marketplace;
