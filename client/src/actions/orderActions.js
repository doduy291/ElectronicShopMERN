import axios from 'axios';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  console.log(order);
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const configs = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/orders/create-order`, order, configs);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const { userInfo } = getState().userLogin;
    const configs = {
      headers: {
        // 'Content-Type': 'application/json', // Not use Content-Type when work with GET Request
        Authorization: `${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, configs);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const payOrder = (orderID, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });
    const { userInfo } = getState().userLogin;
    const configs = {
      headers: {
        'Content-Type': 'application/json', // Not use Content-Type when work with GET Request
        Authorization: `${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/orders/${orderID}/pay`, paymentResult, configs);
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_MY_LIST_REQUEST,
    });
    const { userInfo } = getState().userLogin;
    const configs = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myorders`, configs);
    dispatch({
      type: ORDER_MY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_MY_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });
    const { userInfo } = getState().userLogin;
    const configs = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/`, configs);
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
