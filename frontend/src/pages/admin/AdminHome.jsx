import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AdminBaseURL, UserBaseURL } from '../../utils/const';
import './Admin.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AdminHome() {
    const [users, setUsers] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState({});
    const [showDelete, setShowDelete] = useState({});
    const handleCloseAdd = () => {
        setShowAdd(false);
    };
    const handleShowAdd = () => {
        setShowAdd(true);
    };
    const handleCloseEdit = (userId) => {
        setShowEdit((prevShowEdit) => ({
            ...prevShowEdit,
            [userId]: false,
        }));
    };
    const handleShowEdit = (userId) => {
        setShowEdit((prevShowEdit) => ({
            ...prevShowEdit,
            [userId]: true,
        }));
    };
    const handleShowDelete = (userId) => {
        setShowDelete((prevState) => ({
            ...prevState,
            [userId]: true,
        }));
    };
    const handleCloseDelete = (userId) => {
        setShowDelete((prevState) => ({
            ...prevState,
            [userId]: false,
        }));
    };

    const [updateUI, setUpdateUI] = useState(false);
    const [search, setSearch] = useState('');
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [id,setId]=useState('')
    const [err, setErr] = useState('')


    useEffect(() => {
        axios.get(`${AdminBaseURL}/getUsers`).then((res) => {
            console.log(res.data);
            setUsers(res.data);
        });
    }, [updateUI]);

    const handleSearch = () => {
        axios.post(`${AdminBaseURL}/search`, { search: search }).then((res) => {
            console.log(res.data)
            setSearch('')
            setUsers(res.data)
        })
    }

    const handleAdd = () => {
        axios.post(`${UserBaseURL}/signup`, { name: name, phone: phone, email: email, password: password })
            .then((res) => {
                console.log(res.data)
                setName('')
                setPhone('')
                setEmail('')
                setPassword('')
                if (res.data.err) {
                    setErr(res.data.err)
                } else {
                    handleCloseAdd()
                    setUpdateUI((prevState) => !prevState)
                }
            })
            .catch((err) => {
                console.log(err, 'signup post error ')
            })
    }

    const handleEdit = (id) => {
        axios.put(`${AdminBaseURL}/editUser/${id}`, { name: name, phone: phone, email: email })
            .then((res) => {
                console.log(res.data);
                setName('')
                setPhone('')
                setEmail('')
                setUpdateUI((prevState) => !prevState)
                handleCloseEdit(id); // Close the edit modal                
            })
    }

    const handleDelete = (id) => {
        axios.delete(`${AdminBaseURL}/deleteUser/${id}`)
            .then((res) => {
                console.log(res)
                setUpdateUI((prevState) => !prevState)
                handleCloseDelete(id);
            })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setErr('');
        }, 3000);

        // Cleanup function to clear the timer if the component unmounts or `err` gets updated before 3 seconds
        return () => clearTimeout(timer);
    }, [err]);
    return (
        <div>
            <div>
                <section className="container" style={{ height: '100vh' }}>
                    <div className="row py-5">
                        <h2 className="ml-3">
                            User Details{' '}
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className="ml-4" data-toggle="modal" data-target="#exampleModal">
                                <button type="button" onClick={handleShowAdd} className="addbtn btn btn-secondary btn1">
                                    Add User
                                </button>
                            </a>
                        </h2>
                        <form >
                            <div className="mt-1 input-group">
                                <div className="form-outline">
                                    <input
                                        value={search}
                                        onChange={(e) => { setSearch(e.target.value) }}
                                        type="search" name="name" id="form1" className="form-control" />
                                </div>
                                <button onClick={handleSearch} type='button' className="btn btn-primary">
                                    Search
                                </button>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a onClick={() => { setUpdateUI((prevState) => !prevState) }} className="ml-5 btn btn-primary" >
                                    Show All users
                                </a>
                            </div>
                        </form>
                        <a className="signoutBtn" href="/admin">
                            Sign Out
                        </a>
                    </div>
                    <div className="text-center">
                        <div className="row table-responsive col-lg-12">
                            <table className="table table-bordered" style={{ width: '100%' }} id="productsTable">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Mobile Number</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a className="btn btn-primary" onClick={() => handleShowEdit(user._id)}>
                                                    Edit
                                                </a>
                                            </td>
                                            <td>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a className="delBtn btn btn-primary" onClick={() => handleShowDelete(user._id)}>
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>

            {/* Add User Modal */}
            <Modal show={showAdd} onHide={handleCloseAdd} centered>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="text-dark"  >
                            <div className="form-group">
                                <label htmlFor="name" className="col-form-label">
                                    Name:
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text" name="name" style={{ color: 'black' }} className="border" id="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="col-form-label">
                                    Email:
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text" name="email" className="border" id="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile" className="col-form-label">
                                    Mobile Number:
                                </label>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="tel" maxLength="10" name="mobile" className="border" id="mobile" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-form-label">
                                    Password:
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="text" name="password" className="border" id="password" />
                            </div>
                            {
                                err ? <div id="msg" class="alert alert-danger ml-4 ">{err}</div> : ''
                            }
                            <div className="modal-footer">
                                <Button variant="secondary" onClick={handleCloseAdd}>
                                    Close
                                </Button>
                                <Button onClick={handleAdd} type="button" variant="primary">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>

            {/* Edit User Modals */}
            {users.map((user) => (
                <Modal show={showEdit[user._id]} onHide={() => handleCloseEdit(user._id)} centered key={user._id}>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form className="text-dark">
                                <div className="form-group">
                                    <label htmlFor="name" className="col-form-label">
                                        Name:
                                    </label>
                                    <input
                                        value={name !== '' ? name : user.name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        name="name"
                                        style={{ color: 'black' }}
                                        className="border"
                                        id="name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">
                                        Email:
                                    </label>
                                    <input
                                        value={email !== '' ? email : user.email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="text"
                                        name="email"
                                        className="border"
                                        id="email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile" className="col-form-label">
                                        Mobile Number:
                                    </label>
                                    <input
                                        value={phone !== '' ? phone : user.phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="tel"
                                        maxLength="10"
                                        name="mobile"
                                        className="border"
                                        id="mobile"
                                    />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => handleCloseEdit(user._id)}>
                                Cancel
                            </Button>
                            <Button onClick={() => handleEdit(user._id)} variant="primary">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            ))}


            {/* Delete User Modals */}
            {users.map((user) => (
                <Modal key={user._id} show={showDelete[user._id]} onHide={() => handleCloseDelete(user._id)} centered>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Do you want to delete user <b className="text-dark">{user.name}</b>?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => handleCloseDelete(user._id)}>
                                Cancel
                            </Button>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a onClick={() => { handleDelete(user._id) }} className="btn btn-danger">
                                Delete
                            </a>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            ))}
        </div>
    );
}
