import React, { useEffect, useState } from 'react';
import ListCards from '../components/ListCards';





const Marketplace = (props) => {
    const { currentUser } = props;
    const [allList, setAllList] = useState([]);


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

    if (allList.length === 0) {
        return (
            <h1 className="text-center">
                Loading
            </h1>
        )
    }
        return (
            <div
                className=''>
                <h1 className="text-center">
                    Marketplace
                </h1>
                <div className="d-flex flex-wrap mt-3 overflow-scroll noscroll ">

                    {
                        allList.map((e, i) => {
                            if (e.price) {
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
                                        currentUser={currentUser}
                                        // setModalShow={setModalShow}

                                    />
                                )
                            }

                            return null;
                        })
                    }
                </div>
                {/* <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}/> */}
            </div>
        )
}

export default Marketplace;
