import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ListCards from '../components/ListCards';
import UserCard from '../components/UserCard';

const ShowProfile = (props) => {
    const { id } = useParams();
    const [profile, setProfile] = useState("");
    const [status, setStatus] = useState("pending");
    const currentUser = props.currentUser;
    //! reset


    useEffect(() => {
        setProfile([]);
        async function getProfile() {
            try {
                console.log("id", id)
                setStatus("status")
                const res = await fetch(`/api/user/${id}/profile`)
                const data = await res.json()
                setProfile(data)
                setStatus("resolved")
            } catch (error) {
                setStatus("failed")
                console.error(error)
            }

        }
        getProfile();
    }, [currentUser, id])


    useEffect(() => {
        console.log("profile", profile)
    })

    if (profile.length > 0)
        return (

            <div
                className="d-flex "
                style={{
                    height: "calc(100vh - 56px)",
                }}
            >
                <div className="position-sticky "
                >
                    <UserCard
                        img={profile[0].user_photo}
                        about={profile[0].about}
                        username={profile[0].username}
                        name={profile[0].name}
                        user_id={profile[0].user_id}
                        id={id}
                        currentUser={currentUser}

                    />
                </div>

                <div className="d-flex flex-wrap mt-3 mx-auto overflow-scroll noscroll ">

                    {
                        (profile[0].price) ?
                            profile.map((e, i) => {

                                return (
                                    <ListCards
                                        img={e.list_images}
                                        title={e.title}
                                        list_id={e.listings_id}
                                        user_id={e.user_id}
                                        category={e.category}
                                        price={e.price}
                                        username={e.username}
                                        date={e.upload_date}
                                        currentUser={currentUser}
                                        url={e.url}
                                    />
                                )
                            }) : <h1>Much Empty</h1>
                    }
                </div>
            </div>

        )
    return (
        <h1 className="text-center">
            Loading
        </h1>
    )

}

export default ShowProfile
