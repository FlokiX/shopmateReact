import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext'; // Импортируем контекст корзины
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart, cart } = useContext(CartContext); // Получаем функцию addToCart и корзину из контекста
  const [isInCart, setIsInCart] = useState(false); // Состояние для отслеживания, добавлен ли продукт в корзину

  // Проверка, есть ли продукт в корзине
  useEffect(() => {
    const productInCart = cart.some(item => item.id === product.id); // Проверяем, есть ли этот продукт в корзине
    setIsInCart(productInCart); // Обновляем состояние isInCart
  }, [cart, product.id]); // Перезапускаем при изменении корзины или id продукта

  const handleAddToCart = () => {
    addToCart(product); // Добавляем продукт в корзину
  };

  return (
    <div className="product-card">
      <img src={process.env.PUBLIC_URL + `/images/${product.image}`} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price} ₽</p>
      <button
        onClick={handleAddToCart}
        disabled={isInCart} // Отключаем кнопку, если товар уже в корзине
      >
        {isInCart ? 'Товар в корзине' : 'Добавить в корзину'} {/* Изменяем текст кнопки */}
      </button>
    </div>
  );
}

export default ProductCard;
