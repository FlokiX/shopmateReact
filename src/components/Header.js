import React, { useState, useEffect } from 'react';
import Login from './anth/Login';
import Register from './anth/Register';
import './Header.css';
import { Link } from 'react-router-dom';

function Header({ onSearchChange, isLoggedIn, setIsLoggedIn }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Обработка успешного входа пользователя
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    handleCloseModal();
  };
  // Обработка выхода пользователя из системы
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user'); 
  };

  const handleSearch = () => {
    if (onSearchChange) {
      onSearchChange(searchInput);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">🍪 Магазин</div>

        <div className="search-container">
          <input 
            type="text" 
            placeholder="Поиск товаров..." 
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-button" onClick={handleSearch}>
            🔍
          </button>
        </div>

        {isLoggedIn ? (
          <div className="cart-container">
            <Link to="/cart">
              <button className="cart-button">🛒 Корзина</button>
            </Link>
            <button className="logout-button" onClick={handleLogout}>Выйти</button>
          </div>
        ) : (
          <button className="login-button" onClick={handleOpenModal}>
            Войти
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-tabs">
              <button 
                className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Вход
              </button>
              <button 
                className={`tab ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => setActiveTab('register')}
              >
                Регистрация
              </button>
            </div>

            <div className="modal-body">
              {activeTab === 'login' ? (
                <Login onSuccess={handleLoginSuccess} />
              ) : (
                <Register onSuccess={handleCloseModal} />
              )}
            </div>

            <button className="modal-close" onClick={handleCloseModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
