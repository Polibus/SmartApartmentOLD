import React, { useState } from "react";

function EditUser(props) {
    const [isAdmin, setIsAdmin] = useState(props.isAdmin);
    const [isActive, setIsActive] = useState(props.isActive);

    const changeIsAdminHandler = event => {
        const value = event.target.value;
        setIsAdmin(value)
    }
    const changeIsActiveHandler = event => {
        const value = event.target.value;
        setIsActive(value)
    }

    const editUser = () => {
        const user = {
            _id: props._id,
            email: props.email,
            password: props.password,
            isAdmin: isAdmin,
            isActive: isActive
        };
        props.onEdit(user)
    }

    return (
        <div className="device">
            <label>Użytkownik jest adminem: </label>
            <select value={isAdmin} onChange={changeIsAdminHandler}>
                <option value="False">Nie</option>
                <option value="True">Tak</option>
            </select>
            <br />
            <label>Użytkownik jest aktywny: </label>
            <select value={isActive} onChange={changeIsActiveHandler}>
                <option value="True">Tak</option>
                <option value="False">Nie</option>
            </select>
            <br />

            <button onClick={() => editUser()}>Zapisz</button>
        </div>

    );
}

export default EditUser;