import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onRemove, onUpdate }) => {
  return (
    <div className="cart-item">
      <img src={process.env.PUBLIC_URL + `/images/${item.image}`} />
      <div className="cart-info">
        <h3>{item.name}</h3>
        <p>{item.price} ₽</p>
        <div className="quantity-controls">
          <button onClick={() => onUpdate(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdate(item.id, item.quantity + 1)}>+</button>
        </div>
        <button className="remove-button" onClick={() => onRemove(item.id)}>Удалить</button>
      </div>
    </div>
  );
};

export default CartItem;
