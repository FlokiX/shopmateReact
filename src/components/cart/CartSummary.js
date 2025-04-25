import React from 'react';
import './CartSummary.css';

const CartSummary = ({ total, onCheckout }) => (
  
    <h3>Итого: {total} $</h3>
  
);

export default CartSummary;
