import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from 'axios';
import './glassesCreate.css';

const GlassesCreate = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState(false); // Inicializar stock como falso por defecto
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateGlasses = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('stock', stock);
            formData.append('category', category);
            formData.append('file', image);

            await axios.post('http://localhost:8080/api/glasses', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/glasses-admin');
        } catch (error) {
            console.error('Error creating glasses:', error);
            setErrorMessage('Error creating glasses.');
        }
    };

    return (
        <div className="glasses-create-page">
            <header>
                <div className="back-icon" onClick={() => navigate(-1)}>
                    <Icon icon="bi:arrow-left" />
                </div>
                <div className="title">Create Glasses</div>
                <Link to="/cart" className="cart-icon">
                    <Icon icon="ant-design:shopping-cart-outlined" />
                </Link>
            </header>

            <div className="content">
                <div className="create-section">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                    <label>Stock:</label>
                    <input type="checkbox" checked={stock} onChange={(e) => setStock(e.target.checked)} />

                    <label>Category:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />

                    <label>Image:</label>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

                </div>

                <button onClick={handleCreateGlasses}>Create Glasses</button>

                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default GlassesCreate;
