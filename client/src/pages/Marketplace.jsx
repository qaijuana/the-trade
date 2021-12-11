import React, { useEffect, useState } from 'react';
import ListCards from '../components/ListCards';
// import { useNavigate } from 'react-router';


const Marketplace = (props) => {
    // const navigate = useNavigate();
    const { currentUser } = props;
    const [allList, setAllList] = useState([]);
    const [list_item, setList_item] = useState([])

    useEffect(() => {
        setList_item([]);
        allList.forEach((element) => {
            const listings_id = element.listings_id
            if (listings_id !== null) {
                list_item.push(listings_id);
                const noRepeat = [...new Set(list_item)];
                setList_item(noRepeat)
            }
        })
    }, [allList]);


    useEffect(() => {
        const getLists = async () => {
            try {
                const res = await fetch("/api/list");
                const data = await res.json();
                setAllList(data);
                console.log("All List", allList, typeof allList)
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

                                    />
                                )
                            }

                            return null;
                        })
                    }
                </div>
            </div>
        )
}

export default Marketplace;
