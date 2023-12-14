import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './account.css';
import Navigation from '../../components/navigation/navigation';

const Account = () => {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);

  const [user, setUser] = useState({
    id: '',
    username: '',
    name: '',
    surname: '',
    email: '',
  });

  const getUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/users/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error.message);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const { newPassword, ...userData } = user;

      await axios.put(`http://localhost:8080/api/users/${user.id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Cambios guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar cambios:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="account-page main-container">
      <header>
      <Icon icon="ion:reorder-three-outline" className="menu-icon" onClick={handleToggleMenu}/>
        <h2>Impresioname</h2>
        <Icon icon="fa-solid:shopping-cart" className="cart-icon" />
      </header>
      <Navigation toggleMenu={toggleMenu} handleToggleMenu={handleToggleMenu} />
      <div className="content">
        <div className="profile-section">
          <div className="user-details">
            <p>{user.username}</p>
            <p>{user.email}</p>
            <label>Name</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} />
            <label>Surname</label>
            <input type="text" name="surname" value={user.surname} onChange={handleChange} />
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Account;
