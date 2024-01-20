import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';
import Navigation from '../../components/navigation/navigation';
import './checkout.css';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [postal, setPostal] = useState('');
  const [province, setProvince] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [toggleMenu, setToggleMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const cartItemsFromLink = location.state && location.state.cartItems;

  const [cartItems] = useState(cartItemsFromLink || []);

  const getUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/users/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error.message);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const user = await getUserData();

      if (!user) {
        return;
      }

      const response = await axios.post('http://localhost:8080/api/buys', {
        orderState: 'Pending',
        id_user: user.id,
      });

      const id_buys = response.data.id;

      const orderInfo = {
        glassesModel: cartItems.map(item => item.name).join(', '),
        orderState: 'Pending',
        orderDate: new Date().toISOString().split('T')[0],
      };

      localStorage.setItem('orderInfo', JSON.stringify(orderInfo));

      for (const item of cartItems) {
        await axios.post('http://localhost:8080/api/contain', {
          id_buys,
          id_glasses: item.id,
          paymentMethod,
        });
      }

      await axios.post('http://localhost:8080/api/directions', {
        direction: address,
        postal,
        province,
        id_user: user.id,
      });

      localStorage.removeItem('cart');

      navigate('/cart', {
        state: {
          orderInfo,
        },
      });
    } catch (error) {
      console.error('Error placing order:', error);

      if (!error.response) {
        alert('Error placing order. Please try again.');
      }
    }
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className="checkout">
      <header>
        <div className="menu-icon" onClick={handleToggleMenu}>
          <Icon icon="ion:reorder-three-outline" />
        </div>
        <div className="title">Impresioname</div>
        <div className="cart-icon">
          <Icon icon="ant-design:shopping-cart-outlined" />
        </div>
      </header>
      <Navigation toggleMenu={toggleMenu} handleToggleMenu={handleToggleMenu} />
      <div className="content-container">
        <div className="checkout-form">
          <h2>Checkout</h2>
          <label>
            Address:
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <label>
            Postal Code:
            <input type="text" value={postal} onChange={(e) => setPostal(e.target.value)} />
          </label>
          <label>
            Province:
            <input type="text" value={province} onChange={(e) => setProvince(e.target.value)} />
          </label>
          <label>
            Payment Method:
            <input
              type="text"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </label>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
        <a href='http://127.0.0.1:5500/frontend/public/html/Checkout.html'>Help</a>
      </div>
    </div>
  );
};

export default Checkout;
