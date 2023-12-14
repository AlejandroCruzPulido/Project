import React from 'react';
import { Link } from 'react-router-dom';
import './navigationSuperAdmin.css';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const NavigationSuperAdmin = ({ toggleMenu, handleToggleMenu }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Glasses', path: '/glasses-admin' },
    { name: 'Users', path: '/users-superadmin' },
  ];
  const socialMedia = [
    { icon: 'ion-logo-instagram', url: 'https://www.instagram.com' },
    { icon: 'ion-logo-twitter', url: 'https://www.twitter.com' },
    { icon: 'ion-logo-facebook', url: 'https://www.facebook.com' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`navigation ${toggleMenu ? 'open' : ''}`}>
      <div className="close-icon" onClick={handleToggleMenu}>
        <Icon icon="ion:close-outline"/>
      </div>
      {menuItems.map((item, index) => (
        <Link key={index} to={item.path} className="menu-item">
          {item.name}
        </Link>
      ))}

      <div className="social-media">
        {socialMedia.map((item, index) => (
          <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
            <Icon icon={item.icon} />
          </a>
        ))}
      </div>
      <button className="logout-button" onClick={handleLogout}></button>
    </div>
  );
};

export default NavigationSuperAdmin;
