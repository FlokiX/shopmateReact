// src/components/Login.js
import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Проверка авторизации при монтировании компонента
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      onSuccess(); // Если пользователь уже авторизован, вызываем onSuccess
    }
  }, [onSuccess]);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Поиск пользователя в LocalStorage
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      setMessage('Вход успешен!');
      localStorage.setItem('isLoggedIn', 'true'); //сообщение об успешном входе
      localStorage.setItem('username', username); //Сохраняем что пользователь авторизован
      onSuccess();  
    } else {
      setMessage('Неверное имя пользователя или пароль.');
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="login-form">
      <h2>Вход</h2>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Войти</button>
      {message && <p className={message.includes('успешен') ? 'success' : ''}>{message}</p>}
    </form>
  );
};

export default Login;
