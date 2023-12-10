import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';
import './glassesDetails.css';

const GlassesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [glasses, setGlasses] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/glasses/${id}`)
      .then(response => {
        setGlasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching glasses details:', error);
      });
  }, [id]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (glasses && glasses.hasStock && quantity > 0) {
      alert(`Added ${quantity} ${quantity > 1 ? 'glasses' : 'glass'} to the cart!`);
      navigate('/');
    } else {
      setErrorMessage('This item is out of stock or the quantity is invalid.');
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
        <div className="cart-icon">
          <Icon icon="ant-design:shopping-cart-outlined" />
        </div>
      </header>

      <div className="content">
        <div className="glasses-detail">
          <img
            className="glasses-detail-image"
            src={`http://localhost:8080/images/${glasses.image}`}
            alt={glasses.name}
          />
          <h3>{glasses.name}</h3>
          <p>Price: ${glasses.price}</p>
          <p>Stock: {glasses.stock ? <Icon icon="bi:check-circle-fill" style={{ color: 'green' }} /> : <Icon icon="bi:x-circle-fill" style={{ color: 'red' }} />}</p>
        </div>
        
        <div className="quantity-section">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>

        <button onClick={handleAddToCart}>Add to Cart</button>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default GlassesDetail;
