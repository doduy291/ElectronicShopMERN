import React from 'react';

const Quantity = () => {
  return (
    <div className="component-quantity">
      <button className="quantity-input__modifier quantity-input__modifier--left">-</button>
      <input className="quantity-input__screen" type="text" />
      <button className="quantity-input__modifier quantity-input__modifier--right">+</button>
    </div>
  );
};

export default Quantity;
