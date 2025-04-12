// src/components/Register.js
import React, { useState } from 'react';
import './Register.css';

const Register = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    // Проверка на правильный формат Gmail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setMessage('Пожалуйста, введите правильный адрес Gmail.');
      return;
    }

    const newUser = { username, password, phone, email };

    // Получаем существующих пользователей из LocalStorage (если есть)
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверка на существование пользователя
    if (users.some(user => user.username === username)) {
      setMessage('Пользователь с таким именем уже существует.');
      return;
    }

    // Добавление нового пользователя
    users.push(newUser);

    // Сохраняем пользователей обратно в LocalStorage
    localStorage.setItem('users', JSON.stringify(users));

    setMessage('Регистрация прошла успешно!');
    onSuccess();
  };

  return (
    <div className="register-form">
      <h2>Регистрация</h2>
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
      <input
        type="text"
        placeholder="Номер телефона"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="email"
        placeholder="Gmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRegister}>Зарегистрироваться</button>
      {message && <p className={message.includes('успешно') ? 'success' : ''}>{message}</p>}
    </div>
  );
};

export default Register;
