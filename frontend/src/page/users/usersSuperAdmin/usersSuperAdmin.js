import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './usersSuperAdmin.css';
import Navigation from '../../../components/navigationSuperAdmin/navigationSuperAdmin';
import { useNavigate } from 'react-router-dom';

const UserSuperAdmin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [token, setToken] = useState('');
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    fetchAllUsers(storedToken);
  }, []);

  const fetchAllUsers = (authToken) => {
    const headers = { Authorization: `Bearer ${authToken}` };

    axios.get('http://localhost:8080/api/users', { headers })
      .then((response) => {
        const filteredUsers = response.data.filter(user => user.role === 'Client' || user.role === 'Admin');
        setUsers(filteredUsers);
      })
      .catch((error) => console.error('Error fetching users:', error));
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      fetchAllUsers(token);
    } else {
      const headers = { Authorization: `Bearer ${token}` };

      axios.get(`http://localhost:8080/api/users?username=${searchTerm}`, { headers })
        .then((response) => {
          const filteredUsers = response.data.filter(user => user.role === 'Client' || user.role === 'Admin');
          setUsers(filteredUsers);
        })
        .catch((error) => console.error('Error searching users:', error));
    }
  };

  const handleUpdateRole = (userId) => {
    const userToUpdate = users.find(user => user.id === userId);

    const updatedUsers = users.map(user =>
      user.id === userId
        ? { ...user, role: user.role === 'Client' ? 'Admin' : 'Client' }
        : user
    );

    setUsers(updatedUsers);

    const headers = { Authorization: `Bearer ${token}` };

    axios.put(`http://localhost:8080/api/users/${userId}`, { role: userToUpdate.role === 'Client' ? 'Admin' : 'Client' }, { headers })
      .then(() => console.log('User role updated successfully'))
      .catch((error) => console.error('Error updating user role:', error));
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);

    const headers = { Authorization: `Bearer ${token}` };

    axios.delete(`http://localhost:8080/api/users/${userId}`, { headers })
      .then(() => console.log('User deleted successfully'))
      .catch((error) => console.error('Error deleting user:', error));
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`app ${toggleMenu ? 'menu-open' : ''}`}>
      <div className="superadmin">
        <header className='header-superadmin'>
          <div className="menu-icon" onClick={handleToggleMenu}>
            <span>☰</span>
          </div>
          <div className="title-superadmin">Admin Panel</div>
        </header>
        <Navigation toggleMenu={toggleMenu} handleToggleMenu={handleToggleMenu} />
        <div className="container-superadmin">
          <div className="search-superadmin">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div>
            {users.map((user) => (
              <div key={user.id} className="user-card-superadmin">
                <div className="user-details-superadmin">
                  <span>{user.username}</span>
                  <br></br>
                  <span>{user.role}</span>
                </div>
                <div className="user-actions-superadmin">
                  <button onClick={() => handleUpdateRole(user.id)}>Update Role</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
                </div>
              </div>
            ))}
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
        <a href='http://127.0.0.1:5500/frontend/public/html/Users1.html'>Help</a>
      </div>
    </div>
  );
};

export default UserSuperAdmin;
