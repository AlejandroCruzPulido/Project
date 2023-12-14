import "./home.css";
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/navigation/navigation';
import { Icon } from '@iconify/react';
import ImageSlider1 from '../../images/model1.png';
import ImageSlider2 from '../../images/model2.png';
import ImageSlider3 from '../../images/model3.png';
import logo from '../../images/logo.png';

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [toggleMenu, setToggleMenu] = useState(false);
  const images = [ImageSlider1, ImageSlider2, ImageSlider3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const changeImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className={`app ${toggleMenu ? 'menu-open' : ''}`}>
      <div className="content">
        <header>
          <div className="menu-icon" onClick={handleToggleMenu}>
            <Icon icon="ion:reorder-three-outline"/>
          </div>
          <div className="title">Impresioname</div>
          <div className="cart-icon">
            <Icon icon="ant-design:shopping-cart-outlined" />
          </div>
          <Navigation toggleMenu={toggleMenu} handleToggleMenu={handleToggleMenu} />
        </header>
        <div className="main-content">
          <img src={logo} className='Logo' alt="Logo" />
          <div className="image-slider">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Captura de pantalla(${index + 72}).png`}
                className={index === currentImageIndex ? 'active' : ''}
                onClick={() => changeImage(index)}
              />
            ))}
            <div className="slider-controls">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={index === currentImageIndex ? 'active-dot' : ''}
                  onClick={() => changeImage(index)}
                ></span>
              ))}
            </div>
          </div>
          <div className="popular-glasses">
            <h2>Most Popular Glasses</h2>
            <div className="glasses-item">
              <img src="" alt="Popular glasses" />
              <h3>Glasses</h3>
              <p>Price: $100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;