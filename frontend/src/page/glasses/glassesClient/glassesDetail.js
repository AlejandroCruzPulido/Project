import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';  
import { Icon } from '@iconify/react';
import axios from 'axios';
import './glassesDetail.css';

const GlassesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [glasses, setGlasses] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchGlassesDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/glasses/${id}`);
        setGlasses(response.data);
      } catch (error) {
        console.error('Error fetching glasses details:', error);
        setErrorMessage('Error fetching glasses details');
      }
    };

    fetchGlassesDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (glasses && glasses.stock > 0) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      const newItem = {
        id: glasses.id,
        name: glasses.name,
        price: glasses.price,
        image: glasses.image,
      };
  
      const isItemInCart = cart.some(item => item.id === newItem.id);
  
      if (!isItemInCart) {
        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
  
        console.log('Item added to cart:', newItem);
  
        if (navigate && location.state) {
          navigate('/cart', { state: { glassesItem: newItem } });
        }
      } else {
        setErrorMessage('Item already in the cart');
      }
    } else {
      setErrorMessage('Item out of stock');
    }
  };
  

  if (!glasses) {
    return <div>Loading...</div>;
  }

  return (
    <div className="glasses-detail-page">
      <header>
        <div className="back-icon" onClick={() => navigate(-1)}>
          <Icon icon="bi:arrow-left" />
        </div>
        <div className="title">Impresioname</div>
        <Link to="/cart" className="cart-icon">
          <Icon icon="ant-design:shopping-cart-outlined" />
        </Link>
      </header>

      <div className="content">
        {glasses && (
          <div className="glasses-detail">
            <img
              className="glasses-detail-image"
              src={`http://localhost:8080/images/${glasses.image}`}
              alt={glasses.name}
            />
            <h3>{glasses.name}</h3>
            <p>Price: ${glasses.price}</p>
            <p>Stock: {glasses.stock > 0 ? <Icon icon="bi:check-circle-fill" style={{ color: 'green' }} /> : <Icon icon="bi:x-circle-fill" style={{ color: 'red' }} />}</p>
          </div>
        )}

        <button onClick={handleAddToCart}>Add to Cart</button>
        <a href='http://127.0.0.1:5500/frontend/public/html/Glasses1.html'>Help</a>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default GlassesDetail;
