import React, { useState, useEffect } from 'react';

const Quantity = ({ valueQuantity, setValueQuantity }) => {
  // ****** WITH REACT STATE ******//
  const incrementQty = () => {
    if (valueQuantity < 50) return setValueQuantity(valueQuantity + 1);
    // if (valueQuantity < 50) return setValueQuantity((x) => x + 1); *** With useEffect
  };
  const decreaseQty = () => {
    if (valueQuantity > 1) return setValueQuantity(valueQuantity - 1);
  };
  // useEffect(() => { console.log(valueQuantity) }, [valueQuantity]);

  return (
    <div className="component-quantity">
      <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decreaseQty}>
        -
      </button>
      <input className="quantity-input__screen" type="text" value={valueQuantity} readOnly />
      <button className="quantity-input__modifier quantity-input__modifier--right" onClick={incrementQty}>
        +
      </button>
    </div>
  );
};

export default Quantity;
