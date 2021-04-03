import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_DECREASE_ITEM,
  CART_INCREASE_ITEM,
  CART_CHANGEQTY_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_EMPTY,
} from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      itemID: id,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const increaseItemCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_INCREASE_ITEM,
    payload: {
      itemID: id,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
export const decreaseItemCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_DECREASE_ITEM,
    payload: {
      itemID: id,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
export const changeItemQtyCart = (id, qty) => async (dispatch, getState) => {
  dispatch({
    type: CART_CHANGEQTY_ITEM,
    payload: {
      itemID: id,
      qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (dataShippingAddress) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: dataShippingAddress,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(dataShippingAddress));
};

export const savePaymentMethod = (dataPaymentMethod) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: dataPaymentMethod,
  });
  localStorage.setItem('paymentMethod', JSON.stringify(dataPaymentMethod));
};

export const emptyCart = () => async (dispatch) => {
  dispatch({
    type: CART_EMPTY,
  });
  localStorage.removeItem('cartItems');
};
