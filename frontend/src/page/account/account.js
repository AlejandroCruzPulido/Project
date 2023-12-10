import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './account.css';

const Account = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: '',
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
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
        // Redirigir a la página de login solo si el error es de autenticación (código 401)
        navigate('/login');
      }
      // Puedes manejar otros tipos de errores aquí si es necesario
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/users/${user.id}`, user, {
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
    <div className="main-container">
      <div className="header">
        <Icon icon="fa-solid:bars" className="navigation-icon" />
        <h2>Title</h2>
        <Icon icon="fa-solid:shopping-cart" className="cart-icon" />
      </div>
      <div className="profile-section">
        <img src="path_to_your_image.jpg" alt="Profile" className="profile-image" />
        <div className="user-details">
          <p>{user.username}</p>
          <p>{user.email}</p>
          <label>Name</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />
          <label>Surname</label>
          <input type="text" name="surname" value={user.surname} onChange={handleChange} />
          <label>Password</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} />
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Account;
