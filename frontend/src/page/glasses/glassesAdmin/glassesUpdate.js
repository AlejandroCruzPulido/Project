import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from 'axios';
import './glassesUpdate.css';

const GlassesUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [glasses, setGlasses] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Nuevos estados para campos editables
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchGlassesDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/glasses/${id}`);
        setGlasses(response.data);

        // Establecer valores iniciales para campos editables
        setName(response.data.name);
        setPrice(response.data.price);
        setStock(response.data.stock);
        setCategory(response.data.category);
      } catch (error) {
        console.error('Error fetching glasses details:', error);
      }
    };

    fetchGlassesDetails();
  }, [id]);

  const handleUpdateGlasses = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/glasses/${id}`, {
        name,
        price,
        stock,
        category, // Agregar category al cuerpo de la solicitud
      });

      if (response.status === 200) {
        navigate(`/glasses-admin/`);
      } else {
        setErrorMessage('Error updating glasses.');
      }
    } catch (error) {
      console.error('Error updating glasses:', error);
      setErrorMessage('Error updating glasses.');
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
          </div>
        )}

        <div className="edit-section">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

          <label>Stock:</label>
          <input type="checkbox" checked={stock} onChange={(e) => setStock(e.target.checked)} />

          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>

        <button onClick={handleUpdateGlasses}>Update Glasses</button>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default GlassesUpdate;
