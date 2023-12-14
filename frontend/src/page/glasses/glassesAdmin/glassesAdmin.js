import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './glassesAdmin.css';
import Navigation from '../../../components/navigationAdmin/navigationAdmin';

const GlassesAdmin = () => {
  const [glasses, setGlasses] = useState([]);
  const [categories] = useState(["men", "women", "kids"]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let url;
    if (selectedCategory === 'all') {
      url = `http://localhost:8080/api/glasses?search=${searchTerm}`;
    } else {
      url = `http://localhost:8080/api/glasses?category=${selectedCategory}&search=${searchTerm}`;
    }

    axios.get(url)
      .then(response => {
        setGlasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching glasses:', error);
      });
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleCreateGlasses = () => {
    navigate('/glasses-create');
  };

  const handleDeleteGlasses = (id) => {
    axios.delete(`http://localhost:8080/api/glasses/${id}`)
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting glasses:', error);
      });
  };

  const handleUpdateGlasses = (id) => {
    navigate(`/glasses-update/${id}`);
  };

  return (
    <div className="glasses-page">
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
      <div className="content">
        <div className="filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search glasses..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="category-filter">
            <p>Category</p>
            <div className="category-dropdown">
              <div className="selected-category" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {selectedCategory}
                <Icon icon="bi:chevron-down" />
              </div>
              {dropdownOpen && (
                <div className="category-options">
                  <div key="all-key" onClick={() => handleCategoryChange('all')}>all</div>
                  {categories.map(category => (
                    <div key={category} onClick={() => handleCategoryChange(category)}>{category}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Icon icon="akar-icons:plus" className="action-icon" onClick={handleCreateGlasses} />

        </div>

        <div className="glasses-list">
          {glasses.map(glasses => (
            <div key={glasses.id}>
              <div className="glasses-item">
                <img src={`http://localhost:8080/images/${glasses.image}`} alt={glasses.name} />
                <h3>{glasses.name}</h3>
                <p>Price: ${glasses.price}</p>
                <p>Stock: {glasses.stock ? <Icon icon="bi:check-circle-fill" style={{ color: 'green' }} /> : <Icon icon="bi:x-circle-fill" style={{ color: 'red' }} />}</p>
                <div className="icon-container">
                  <Icon icon="bi:trash" className="action-icon" onClick={() => handleDeleteGlasses(glasses.id)} />
                  <button className="update-button" onClick={() => handleUpdateGlasses(glasses.id)}>Update Glasses</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlassesAdmin;
