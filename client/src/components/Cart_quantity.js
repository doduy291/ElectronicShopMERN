import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseItemCart, decreaseItemCart, changeItemQtyCart } from '../actions/cartActions';

const Cart_quantity = ({ valueQty, countInStock, itemID }) => {
  // ****** WITH REACT STATE && REDUX ******//
  const [valueQuantity, setValueQuantity] = useState(valueQty);
  const dispatch = useDispatch();
  const incrementQty = () => {
    if (valueQuantity < countInStock) {
      dispatch(increaseItemCart(itemID));
      return setValueQuantity(valueQuantity + 1);
    }
  };
  const decreaseQty = () => {
    if (valueQuantity > 1) {
      dispatch(decreaseItemCart(itemID));
      return setValueQuantity(valueQuantity - 1);
    }
  };
  const changeValueInputQty = (valueInputQty) => {
    dispatch(changeItemQtyCart(itemID, valueInputQty));
    return setValueQuantity(valueInputQty);
  };

  return (
    <div className="component-quantity">
      <button className="quantity-input__modifier quantity-input__modifier--left" onClick={() => decreaseQty()}>
        -
      </button>
      <input
        className="quantity-input__screen"
        type="text"
        value={valueQuantity}
        onChange={(e) => changeValueInputQty(e.target.value)}
      />
      <button className="quantity-input__modifier quantity-input__modifier--right" onClick={() => incrementQty()}>
        +
      </button>
    </div>
  );
};

export default Cart_quantity;
