import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Container, Col, Row } from 'react-bootstrap';
import ListCards from '../components/ListCards';
import UserCard from '../components/UserCard';
import { useNavigate } from 'react-router';

const ShowProfile = (props) => {
    const { id } = useParams();
    const [profile, setProfile] = useState([]);
    const [status, setStatus] = useState("pending");
    // const navigate = useNavigate();
    const currentUser = props.currentUser;
    //! reset


    useEffect(() => {
        setProfile([]);
        async function getProfile() {
            try {
                setStatus("status")
                const res = await fetch(`/api/user/${id}`)
                const data = await res.json()
                console.log(profile, data)
                setProfile(data)
                setStatus("resolved")
            } catch (error) {
                setStatus("failed")
                console.error(error)
            }

        }
        getProfile();
    }, [currentUser, id])

    console.log(profile)


    if (profile.length > 0)
        return (
            <Col className="d-flex"  >
                <Row className=" my-auto position-relative"
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
                </Row>

                <Row className=" d-flex flex-row mt-3 mx-auto ">

                    {(profile[0].price) ?
                        profile.map((e, i) => {
                            return (
                                <ListCards
                                    img={e.list_images}
                                    title={e.title}
                                    list_id={e.id}
                                    user_id={e.user_id}
                                    category={e.category}
                                    price={e.price}
                                    author={e.username}
                                    date={e.upload_date}
                                    currentUser={currentUser}
                                    url={e.url}
                                />
                            )
                        }) : <h1>Much Empty</h1>
                    }
                </Row>
            </Col>

        )
    return (
        <h1 className="text-center">
            Loading
        </h1>
    )

}

export default ShowProfile
