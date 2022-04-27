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

    const handleDelete = async () =>
    {      
        setShow(false);
        await axios.delete(`http://localhost:8080/users/delete/${id}`);
        setId(0);
        getUsers();
    }

    return (
        <div>        
<div className='text-center' style={{margin: '30px 0 20px 0'}}><Link to="/add" className="btn btn-sm btn-outline-success">Add User</Link></div>
<h2 className='text-center'>Users List</h2>
<div className="table-responsive card" style={{padding: '10px'}}>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>              
            </tr>
          </thead>
          <tbody>
                    { users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/edit/${user.id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>&nbsp;&nbsp;
                                <button onClick={() => {
                                        setId(user.id);
                                        setShow(true); 
                                     }
                                } className="btn btn-sm btn-outline-danger">Delete</button>
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
