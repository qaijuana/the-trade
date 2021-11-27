import React, { useEffect, useState } from 'react';
import ListCards from '../components/ListCards';
import { useNavigate } from 'react-router';


const Marketplace = (props) => {

    const [allList, setAllList] = useState([]);
    const navigate = useNavigate();

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
            <h1>Loading</h1>
        )
    }
    if (allList.length !== 0)
        return (
            <>
                <h1>Marketplace</h1>
            <div className="wrapper">

                {
                    allList.map((e, i) => {
                        if (e.price)
                            return (
                                <ListCards img={e.list_images} title={e.title}
                                    category={e.category} price={e.price} author={e.username} date={e.upload_date}
                                    onClick={() => { navigate(`/list/${e.id}`) }}
                                    onUser={() => { navigate(`/user/${e.user_id}`) }}
                                />
                            )

                    })
                }
            </div>
            </>
        )
}

export default Marketplace;
