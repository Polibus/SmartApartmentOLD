import React, { useState } from "react";
function User(props) {

    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    }

    const editHandler = () => {
        props.onEdit({
            _id: props._id,
            email: props.email,
            isAdmin: props.isAdmin,
            isActive: props.isActive,
        })
    }
    return (
        <div className="device">
            <p onClick={toggleDescription}>{props.email} </p>
            {showDescription ? (
                <div className="description"> {props.isAdmin} <br /> {props.isActive} </div>
            ) : null}
            <button onClick={editHandler}>edytuj</button>
            <button className="delete" onClick={() => { props.onDelete(props._id); }}>usuń</button>
        </div>

    );
}

export default User;