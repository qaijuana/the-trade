import React, { useEffect, useState } from 'react';

import ListCards from '../components/ListCards'

function ShowLikes(props) {
    const [like_list, setLike_list] = useState();
    const [status, setStatus] = useState("pending")
    const { currentUser } = props;

    useEffect(() => {
        const getLists = async () => {
            setStatus("loading")
            try {
                console.log("getting lists")
                const res = await fetch("/api/likes");
                const data = await res.json();
                setLike_list(data);
                setStatus("resolved")
            } catch (error) {
                setStatus("resolved")
                console.error(error);
            }
        }
        getLists();
    }, [])

    return (
        <div>
            <h1 className="text-center">
                Likes
            </h1>

            {
                like_list && like_list.length > 0 ?
                    like_list.map((e, i) => {
                        if (e.price) {
                            return (
                                <div className="d-flex flex-wrap mt-3 overflow-scroll noscroll ">
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
                                </div>
                            )
                        }

                        return null;
                    })
                    :
                    like_list && like_list.length === 0 ?
                        <h1 className="text-center">Much Empty</h1> :
                        <div className="text-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
            }

        </div>
    )
}

export default ShowLikes
