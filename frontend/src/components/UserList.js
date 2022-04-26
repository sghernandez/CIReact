/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import ModalConfirm from './utils/ModalConfirm';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [id, setId] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    useEffect(() => { getUsers(); }, []);

    const getUsers = async () => {
        const users = await axios.get('http://localhost:8080/users');
        setUsers(users.data);
    }

    const showDelete = (id) => {
        setId(id);
        setShow(true);        
    }

    const handleDelete = async () =>
    {      
        setShow(false);
        await axios.delete(`http://localhost:8080/users/delete/${id}`);
        setId(0);
        getUsers();
    }

    return (
        <div>            
            <div align="center"><Link to="/add" className="button is-small is-info mt-5">Add User</Link></div>
            <div className='card' style={{padding: '5px', margin: '30px'}}>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/edit/${user.id}`} className="button is-small is-info">Edit</Link>&nbsp;&nbsp;
                                <button onClick={() => showDelete(user.id)} className="button is-small is-danger">Delete</button>
                            </td>
                        </tr>
                    )) }                    
                </tbody>
            </table>            
          </div> 
          <ModalConfirm show={show} handleClose={handleClose} handleDelete={handleDelete} />           
        </div>
    )
}

export default UserList
