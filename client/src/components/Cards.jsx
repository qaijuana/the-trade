import React from 'react'


const Cards = (props) => {
    return (
        <div>
            <div className="card">
                <img className="card-img" src={props.img}
                    alt={"TIPS MARKETPLACE" + props.title + props.description} />
                <div className="card-body">
                    <h2 className="card-title">{props.title}</h2>
                    <p className="card-description">{props.description}</p>
                    <h3 className="card-price">{props.price}</h3>
                    <button className="card-offer">Offer</button>
                    <br />
                    <button className="card-msg">Message</button>
                </div>
            </div>
        </div>

    )
}

export default Cards
