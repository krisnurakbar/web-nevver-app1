import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Drawer from '../components/Drawer';

const UsersListLayer = () => {
    const [users, setUsers] = useState([]);
    const savedToken = localStorage.getItem('authToken');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerViewOpen, setIsDrawerViewOpen] = useState(false);
    const [isDrawerUpdateOpen, setIsDrawerUpdateOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    // {/* Create User */}
    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + savedToken
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (response.ok) {
                alert('User registered successfully');
                setName('');
                setEmail('');
                setPassword('');
                window.location.reload();
            } else {
                alert('An error occurred during registration. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again later.');
        }

    };
    // {/* End Create User */}

    // {/* View User */}
    const handleViewDrawerOpen = async (user) => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${user.id}`, {
            headers: {
                'Authorization': 'Bearer ' + savedToken
            }
          });
          setSelectedUser(response.data);
          setIsDrawerViewOpen(true);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
    };

    const handleViewDrawerClose = () => {
        setIsDrawerViewOpen(false);
    };
    // {/* End View User */}

    // {/* Update User */}
    const handleUpdateDrawerOpen = async (user) => {
        setIsDrawerUpdateOpen(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${user.id}`, {
            headers: {
                'Authorization': 'Bearer ' + savedToken
            }
          });
          setSelectedUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
    };
  
    const handleUpdateDrawerClose = () => {
        setIsDrawerUpdateOpen(false);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${selectedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + savedToken
                },
                body: JSON.stringify({
                    name: selectedUser.name,
                    email: selectedUser.email,
                    role: selectedUser.role,
                }),
            });
            if (response.ok) {
                alert('User updated successfully');
                setName('');
                setEmail('');
                setPassword('');
                window.location.reload();
            } else {
                alert('An error occurred during registration. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again later.');
        }
    };
    // {/* End Update User */}

    // {/* Delete User */}
    const handleDeleteUser = async (user) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/delete/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + savedToken
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (response.ok) {
                alert('User deleted successfully');
                setName('');
                setEmail('');
                setPassword('');
                window.location.reload();
            } else {
                alert('An error occurred during registration. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again later.');
        }
    }
    // {/* End Delete User */}

    // {/* Fetch Users */}
    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users`, {
            headers: {
                'Authorization': 'Bearer ' + savedToken
            }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        };

        fetchUsers();
    }, [savedToken]);
    // {/* End Fetch Users */}

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <span className="text-md fw-medium text-secondary-light mb-0">Show</span>
                    <select className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px" defaultValue="Select Number">
                        <option value="Select Number" disabled>
                            Select Number
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <form className="navbar-search">
                        <input
                            type="text"
                            className="bg-base h-40-px w-auto"
                            name="search"
                            placeholder="Search"
                        />
                        <Icon icon="ion:search-outline" className="icon" />
                    </form>
                    <select className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px" defaultValue="Select Status">
                        <option value="Select Status" disabled>
                            Select Status
                        </option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <Link
                    to="#"
                    className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                    onClick={handleDrawerOpen}
                >
                    <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
                    Add New User
                </Link>
            </div>
            <div className="card-body p-24">
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Tokens</th>
                                <th scope="col" className="text-center">Role</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr>
                                <td>
                                    <div className="d-flex align-items-center gap-10">
                                        <div className="form-check style-check d-flex align-items-center">
                                            <input
                                                className="form-check-input radius-4 border border-neutral-400"
                                                type="checkbox"
                                                name="checkbox"
                                            />
                                        </div>
                                        {user.id}
                                    </div>
                                </td>
                                
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="assets/images/user-list/user-list1.png"
                                            alt="Wowdash"
                                            className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                        />
                                        <div className="flex-grow-1">
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {user.name}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                
                                <td>
                                    <span className="text-md mb-0 fw-normal text-secondary-light">
                                        {user.email}
                                    </span>
                                </td>
                                <td>{user.tokens}</td>
                                
                                <td>{user.role}</td>
                                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                
                                <td className="text-center">
                                <span
                                    className={`px-24 py-4 radius-4 fw-medium text-sm ${
                                        user.status 
                                            ? 'bg-success-focus text-success-600 border border-success-main' 
                                            : 'bg-danger-focus text-danger-600 border border-danger-main'
                                    }`}
                                >
                                    {user.status ? 'Active' : 'Inactive'}
                                </span>
                                </td>
                                <td className="text-center">
                                    <div className="d-flex align-items-center gap-10 justify-content-center">
                                        <button
                                            type="button"
                                            className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                            onClick={() => handleViewDrawerOpen(user)}
                                        >
                                            <Icon
                                                icon="majesticons:eye-line"
                                                className="icon text-xl"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                            onClick={() => handleUpdateDrawerOpen(user)}
                                        >
                                            <Icon icon="lucide:edit" className="menu-icon" />
                                        </button>
                                        <button
                                            type="button"
                                            className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                            onClick={() => handleDeleteUser(user)}
                                        >
                                            <Icon
                                                icon="fluent:delete-24-regular"
                                                className="menu-icon"
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                    <span>Showing 1 to 10 of 12 entries</span>
                    <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                        <li className="page-item">
                            <Link
                                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md"
                                to="#"
                            >
                                <Icon icon="ep:d-arrow-left" className="" />
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md bg-primary-600 text-white"
                                to="#"
                            >
                                1
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px"
                                to="#"
                            >
                                2
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                to="#"
                            >
                                3
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                to="#"
                            >
                                4
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                to="#"
                            >
                                5
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md"
                                to="#"
                            >
                                {" "}
                                <Icon icon="ep:d-arrow-right" className="" />{" "}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
                <h6 className='mb-20'>Add New User</h6>
                <hr/>
                <form onSubmit={handleCreateUser}>
                <div className="mb-20 mt-20">
                        <label
                            htmlFor="name"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Name <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Your Name"
                        />
                    </div>
                    <div className="mb-20">
                        <label
                            htmlFor="email"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Email <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="email"
                            className="form-control radius-8"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                        />
                    </div>
                    <div className="mb-20">
                        <label
                            htmlFor="password"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Password <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="password"
                            className="form-control radius-8"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                        type="button"
                        className="btn btn-outline-danger-600 radius-8 px-20 py-11 d-flex align-items-center gap-2 w-100"
                        onClick={handleDrawerClose}
                    >
                        <Icon
                            icon="line-md:file-document-cancel-twotone"
                            className="text-xl"
                        />{" "}
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary-600 radius-8 px-20 py-11 d-flex align-items-center gap-2 w-100"
                    >
                        <Icon
                            icon="fluent:document-save-20-regular"
                            className="text-xl"
                        />{" "}
                        Save
                    </button>
                    </div>
                </form>
            </Drawer>
            <Drawer isOpen={isDrawerViewOpen} onClose={handleViewDrawerClose}>
                <h6 className='mb-20'>View User Profile</h6>
                <hr/>
                {selectedUser && (
                <div className="card-body mb-20 mt-20">
                    <div className="row gy-3">
                        <div className="col-12">
                            <label className="form-label">Name</label>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="f7:person" />
                                </span>
                                <input
                                    type="text"
                                    id='name'
                                    className="form-control"
                                    value={selectedUser.name}
                                    placeholder="Enter Name"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Email</label>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="mage:email" />
                                </span>
                                <input
                                    type="email"
                                    id='email'
                                    className="form-control"
                                    value={selectedUser.email}
                                    placeholder="Enter Email"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Token</label>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="mage:email" />
                                </span>
                                <input
                                    type="text"
                                    id='token'
                                    className="form-control"
                                    value={selectedUser.tokens}
                                    placeholder="Tokens Value"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Created At</label>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="mage:email" />
                                </span>
                                <input
                                    type="text"
                                    id='created_at'
                                    className="form-control"
                                    value={new Date(selectedUser.created_at).toLocaleDateString()}
                                    placeholder="Created at"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </Drawer>
            <Drawer isOpen={isDrawerUpdateOpen} onClose={handleUpdateDrawerClose}>
                <h6>Update User Profile</h6>
                <hr/>
                {selectedUser && (
                <form onSubmit={handleUpdateUser}>
                <div className="card-body mb-20 mt-20">
                    <div className="row gy-3">
                        <div className="col-12">
                            <label className="form-label">Name</label>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="f7:person" />
                                </span>
                                <input
                                    type="text"
                                    id='name'
                                    className="form-control"
                                    value={selectedUser.name}
                                    onChange={(e) =>
                                        setSelectedUser((prev) => ({ ...prev, name: e.target.value }))
                                      }
                                    placeholder="Enter Name"
                                    
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Email</label>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="mage:email" />
                                </span>
                                <input
                                    type="email"
                                    id='email'
                                    className="form-control"
                                    value={selectedUser.email}
                                    onChange={(e) =>
                                        setSelectedUser((prev) => ({ ...prev, email: e.target.value }))
                                      }
                                    placeholder="Enter Email"
                                    
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Token</label>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="mage:email" />
                                </span>
                                <input
                                    type="text"
                                    id='token'
                                    className="form-control"
                                    value={selectedUser.tokens}
                                    placeholder="Tokens Value"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Created At</label>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="mage:email" />
                                </span>
                                <input
                                    type="text"
                                    id='created_at'
                                    className="form-control"
                                    value={new Date(selectedUser.created_at).toLocaleDateString()}
                                    placeholder="Created at"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-3">
                            <button
                                type="button"
                                className="btn btn-outline-danger-600 radius-8 px-20 py-11 d-flex align-items-center gap-2 w-100"
                                onClick={handleUpdateDrawerClose}
                            >
                                <Icon
                                    icon="line-md:file-document-cancel-twotone"
                                    className="text-xl"
                                />{" "}
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary-600 radius-8 px-20 py-11 d-flex align-items-center gap-2 w-100"
                            >
                                <Icon
                                    icon="fluent:document-save-20-regular"
                                    className="text-xl"
                                />{" "}
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                </form>
                )}
            </Drawer>
        </div>
        

    );
};

export default UsersListLayer;