import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    const calculateTotalPrice = () => {
      const total = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, []);

  return (
    <div className="cart">
      <header>
        <div className="title">Impresioname</div>
        <Link to="/cart" className="cart-icon">
          <Icon icon="ant-design:shopping-cart-outlined" />
        </Link>
      </header>

      <div className="content-container">
        <div className="glasses-section">
          {cartItems.map(item => (
            <div key={item.id} className="added-glasses">
              <div className="glasses-info">
                <img
                  className="glasses-image"
                  src={`http://localhost:8080/images/${item.id}`}
                  alt={item.name}
                />
                <div className="glasses-details">
                  <p>Glasses ID: {item.id}</p>
                  <p>Name: {item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="total-section">
            <p>Total: ${totalPrice}</p>
            <button>Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
