import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [orderComplete, setOrderComplete] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setOrderComplete(true);
    clearCart();
  };

  const handleCloseCart = () => {
    navigate('/'); // Переход на главную страницу
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>🛒 Корзина</h2>
        <button className="close-btn" onClick={handleCloseCart}>✖</button>
      </div>

      {orderComplete && <p className="order-complete">✅ Вы совершили покупку!</p>}
      {cart.length === 0 && !orderComplete && <p>Корзина пуста</p>}

      {/* Отображаем все товары в корзине с возможностью прокрутки */}
      <div className="cart-items">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeFromCart}
            onUpdate={updateQuantity}
          />
        ))}
      </div>

      {/* Отображаем итоговую сумму и кнопку оформления заказа */}
      {cart.length > 0 && !orderComplete && (
        <div className="cart-summary">
          <CartSummary total={total} />
          <div className="cart-buttons">
            <button className="clear-cart-btn" onClick={clearCart}>Очистить корзину</button>
            <button className="checkout-btn" onClick={handleCheckout}>Оформить заказ</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
