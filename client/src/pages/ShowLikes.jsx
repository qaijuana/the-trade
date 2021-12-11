import React, { useEffect, useState } from 'react';

import ListCards from '../components/ListCards'

function ShowLikes(props) {
    const [like_list, setLike_list] = useState();
    const { currentUser } = props;

    useEffect(() => {
        console.log("using effects")
        const getLists = async () => {
            try {
                console.log("getting lists")
                const res = await fetch("/api/likes");
                const data = await res.json();
                setLike_list(data);

            } catch (error) {
                console.error(error);
            }
        }
        getLists();
    }, [])

    return (
        <div
            className=''>
            <h1 className="text-center">
                Likes
            </h1>
            <div className="d-flex flex-wrap mt-3 overflow-scroll noscroll ">

                {
                    like_list && like_list.length > 0 ?
                        like_list.map((e, i) => {
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
                        :
                        <h1 className="text-center">Much Empty</h1>
                }
            </div>
        </div>
    )
}

export default ShowLikes
