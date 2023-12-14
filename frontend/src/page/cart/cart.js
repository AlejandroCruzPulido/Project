import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './cart.css';
import Navigation from '../../components/navigation/navigation';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0); 
  const [orderInfo, setOrderInfo] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const glassesItemFromDetail = location.state && location.state.glassesItem;

    if (glassesItemFromDetail) {
      storedCart.push(glassesItemFromDetail);
      localStorage.setItem('cart', JSON.stringify(storedCart));
    }

    setCartItems(storedCart);

    const calculateTotalPrice = () => {
      const total = storedCart.reduce((acc, item) => acc + item.price, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();

    const storedOrderInfo = JSON.parse(localStorage.getItem('orderInfo'));
    if (storedOrderInfo) {
      setOrderInfo(storedOrderInfo);
    }

    setTotalItems(storedCart.length);
  }, [location.state]);

  const handleDeleteGlasses = (glasses) => {
    const updatedCart = cartItems.filter(item => item !== glasses);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    const newTotalItems = totalItems - 1;

    setCartItems(updatedCart);
    setTotalItems(newTotalItems);  
    setTotalPrice(prevTotalPrice => prevTotalPrice - glasses.price);
  };

  const handleBuyButtonClick = () => {
    console.log('Order Summary:', orderInfo);

    localStorage.removeItem('cart');
    localStorage.removeItem('orderInfo');

    navigate('/checkout', { state: { cartItems: cartItems.map(item => ({ id: item.id })) } });
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className="cart">
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
                  <p>Price: ${item.price}</p>
                  <Icon
                    icon="bi:trash"
                    className="action-icon"
                    onClick={() => handleDeleteGlasses(item)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="total-section">
            <p>Total Items: {totalItems}</p>
            <p>Total: ${totalPrice}</p>
            <button className="buy-button" onClick={handleBuyButtonClick}>
              Proceed to Checkout
            </button>
            {orderInfo && (
              <div className="order-summary">
                <h3>Order Summary</h3>
                <p>Date: {orderInfo.orderDate}</p>
                <p>Order State: {orderInfo.orderState}</p>
                <p>Items: {totalItems}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
