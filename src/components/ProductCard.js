import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext'; 
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart, cart } = useContext(CartContext); // Получаем функцию addToCart и корзину из контекста
  const [isInCart, setIsInCart] = useState(false); // Состояние для отслеживания, добавлен ли продукт в корзину

  // Проверка, есть ли продукт в корзине
  useEffect(() => {
    const productInCart = cart.some(item => item.id === product.id); 
    setIsInCart(productInCart); 
  }, [cart, product.id]); 

  const handleAddToCart = () => {
    addToCart(product); 
  };

  return (
    <div className="product-card">
      <img src={process.env.PUBLIC_URL + `/images/${product.image}`} alt={product.name} />

      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price} $</p>
      <button
        onClick={handleAddToCart}
        disabled={isInCart} 
      >
        {isInCart ? 'Товар в корзине' : 'Добавить в корзину'} 
      </button>
    </div>
  );
}

export default ProductCard;
