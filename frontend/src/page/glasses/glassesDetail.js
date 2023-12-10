import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from 'axios';
import './glassesDetails.css';

const GlassesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [glasses, setGlasses] = useState(null);
  const [quantity, setQuantity] = useState(1);  // Default quantity to 1
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchGlassesDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/glasses/${id}`);
        setGlasses(response.data);
      } catch (error) {
        console.error('Error fetching glasses details:', error);
      }
    };

    fetchGlassesDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (glasses && glasses.hasStock && quantity > 0) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      const newItem = {
        id: glasses.id,
        name: glasses.name,
        price: glasses.price,
        quantity: quantity,
      };

      cart.push(newItem);

      localStorage.setItem('cart', JSON.stringify(cart));

      navigate('/cart');
    } else {
      setErrorMessage('Invalid quantity or product details.');
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
            <p>Stock: {glasses.stock ? <Icon icon="bi:check-circle-fill" style={{ color: 'green' }} /> : <Icon icon="bi:x-circle-fill" style={{ color: 'red' }} />}</p>
          </div>
        )}

        <div className="quantity-section">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
          />
        </div>

        <button onClick={handleAddToCart}>Add to Cart</button>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default GlassesDetail;
