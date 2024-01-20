import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './usersAdmin.css';
import Navigation from '../../../components/navigationAdmin/navigationAdmin';
import { useNavigate } from 'react-router-dom';

const UserAdmin = () => {
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
        const filteredUsers = response.data.filter(user => user.role === 'Client');
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
          const filteredUsers = response.data.filter(user => user.role === 'Client');
          setUsers(filteredUsers);
        })
        .catch((error) => console.error('Error searching users:', error));
    }
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
      <div className="content">
        <header>
          <div className="menu-icon" onClick={handleToggleMenu}>
            <span>☰</span>
          </div>
          <div className="title-admin">Admin Panel</div>
        </header>
        <Navigation toggleMenu={toggleMenu} handleToggleMenu={handleToggleMenu} />
        <div className="admin">
          <div className="search-admin">
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
              <div key={user.id} className="user-card-admin">
                <div className="user-details-admin">
                  <span>{user.username}</span>
                  <span>{user.role}</span>
                </div>
                <div className="user-actions-admin">
                  <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
                </div>
              </div>
            ))}
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
        <a href='http://127.0.0.1:5500/frontend/public/html/Users.html'>Help</a>
      </div>
    </div>
  );
};

export default UserAdmin;
