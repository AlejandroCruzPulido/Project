import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import GlassesDetail from './glassesDetail';
import './glasses.css';
import Navigation from '../../components/navigation/navigation';


const Glasses = () => {
  const [glasses, setGlasses] = useState([]);
  const [categories] = useState(["men", "women", "kids"]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

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
        </div>

        <div className="glasses-list">
          {glasses.map(gafa => (
            <Link key={gafa.id} to={`/glasses/${gafa.id}`}>
              <div className="glasses-item">
                <img src={`http://localhost:8080/images/${gafa.image}`} alt={gafa.name} />
                <h3>{gafa.name}</h3>
                <p>Price: ${gafa.price}</p>
                <p>Stock: {gafa.stock ? <Icon icon="bi:check-circle-fill" style={{ color: 'green' }} /> : <Icon icon="bi:x-circle-fill" style={{ color: 'red' }} />}</p>
              </div>
            </Link>
          ))}
        </div>

        <Routes>
          <Route path="/glasses/:id" element={<GlassesDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default Glasses;
