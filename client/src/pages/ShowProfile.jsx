import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Container, Col } from 'react-bootstrap';
import ListCards from '../components/ListCards';
import UserCard from '../components/UserCard';
import { useNavigate } from 'react-router';

const ShowProfile = (props) => {
    const { id } = useParams();
    const [profile, setProfile] = useState([]);
    const [status, setStatus] = useState("pending");
    const navigate = useNavigate();

    useEffect(() => {
        async function getProfile() {
            try {
                setStatus("status")
                const res = await fetch(`/api/user/${id}`)
                const data = await res.json()
                setProfile(data)
                setStatus("resolved")
            } catch (error) {
                setStatus("failed")
                console.error(error)
            }

        }
        getProfile();
    }, [])

    console.log(profile)


    if (profile.length > 0)
        return (
            <Container  >
                <Col className="justify-content-center">
                    <UserCard img={profile[0].user_photo}
                        about={profile[0].about} username={profile[0].username} name={profile[0].name}

                    />
                </Col>

                <Col className="d-flex wrapper justify-content-around mt-5">
                    {(profile[0].price) ?
                        profile.map((e, i) => {
                            return (
                                <ListCards
                                    img={e.list_images} title={e.title}
                                    category={e.category} price={e.price} author={e.username} date={e.upload_date}
                                    onClick={() => { navigate(`/list/${e.id}`) }}
                                    onUser={() => { navigate(`/user/${e.user_id}`) }}
                                />
                            )
                        }) : <h1>Much Empty</h1>
                    }
                </Col>
            </Container>

        )
    return (
        <h1>Loading</h1>
    )

}

export default ShowProfile
