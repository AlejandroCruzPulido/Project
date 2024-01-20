import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';
import { Icon } from '@iconify/react';

const Navigation = ({ toggleMenu, handleToggleMenu }) => {
  const menuItems = [
    { name: 'Glasses', path: '/glasses' },
    { name: 'Account', path: '/account' },
    { name: 'Report', path: 'http://localhost:5488/templates/CdT20C7', external: true },
    { name: 'Home', path: '/home' }
  ];
  const socialMedia = [
    { icon: 'ion-logo-instagram', url: 'https://www.instagram.com' },
    { icon: 'ion-logo-twitter', url: 'https://www.twitter.com' },
    { icon: 'ion-logo-facebook', url: 'https://www.facebook.com' }
  ];

  return (
    <div className={`navigation ${toggleMenu ? 'open' : ''}`}>
      <div className="close-icon" onClick={handleToggleMenu}>
        <Icon icon="ion:close-outline"/>
      </div>
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.external ? (
            <a href={item.path} target="_blank" rel="noopener noreferrer" className="menu-item">
              {item.name}
            </a>
          ) : (
            <Link to={item.path} className="menu-item">
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
      <div className="social-media">
        {socialMedia.map((item, index) => (
          <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
            <Icon icon={item.icon} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
