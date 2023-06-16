import React from "react";
import './AdminPanel.css'
import User from "./User/User";
import Modal from 'react-modal';
import EditUser from "./EditUser/EditUser";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { Link } from 'react-router-dom';
class AdminPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],

            showEditModal: false,
            editUser: {}
        };
    }

    componentDidMount() {
        this.fechUsers();
    }

    async fechUsers() {
        const res = await axios.get('http://localhost:3001/api/admin')
        const users = res.data

        this.setState({ users });
    }

    async deleteUser(_id) {
        const users = [...this.state.users].filter(user => user._id !== _id);
        await axios.delete('http://localhost:3001/api/admin/' + _id)
        this.setState({ users });
    }

    async editUser(user) {

        await axios.put('http://localhost:3001/api/admin/' + user._id, user)

        const users = [...this.state.users];
        const index = users.findIndex(x => x._id === user._id)
        if (index >= 0) {
            users[index] = user;
            this.setState({ users });
        }
        this.toggleModal();
    }

    toggleModal() {
        this.setState({ showEditModal: !this.state.showEditModal });
    }

    editUserHandler(user) {
        this.toggleModal()
        this.setState({ editUser: user })
    }

    render() {

        return (
            <div>
                <p> Użytkownicy: <Link to="/api/devices">Urządenia</Link></p>

                <Modal
                    isOpen={this.state.showEditModal}
                    contentLabel="Edytuj urządzenie"
                    ariaHideApp={false}>
                    <EditUser
                        _id={this.state.editUser._id}
                        email={this.state.editUser.email}
                        password={this.state.editUser.password}
                        isAdmin={this.state.editUser.isAdmin}
                        isActive={this.state.editUser.isActive}
                        onEdit={user => this.editUser(user)}
                    />
                    <button onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>


                {this.state.users.map(user => (
                    <User
                        key={user._id}
                        _id={user._id}
                        email={user.email}
                        password={user.password}
                        isAdmin={user.isAdmin}
                        isActive={user.isActive}
                        onEdit={(user) => this.editUserHandler(user)}
                        onDelete={(_id) => this.deleteUser(_id)}
                    />
                ))}

            </div>
        );
    }
}

export default AdminPanel;