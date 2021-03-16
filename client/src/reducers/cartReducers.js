import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_INCREASE_ITEM,
  CART_DECREASE_ITEM,
  CART_CHANGEQTY_ITEM,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        state.cartItems[state.cartItems.findIndex((x) => x.product === item.product)].qty += item.qty;
        return { ...state, cartItems: state.cartItems.map((x) => x) };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return { ...state, cartItems: state.cartItems.filter((x) => x.product !== action.payload.itemID) };
    case CART_INCREASE_ITEM:
      state.cartItems[state.cartItems.findIndex((x) => x.product === action.payload.itemID)].qty++;
      return { ...state, cartItems: state.cartItems.map((x) => x) };
    case CART_DECREASE_ITEM:
      state.cartItems[state.cartItems.findIndex((x) => x.product === action.payload.itemID)].qty--;
      return { ...state, cartItems: state.cartItems.map((x) => x) };
    case CART_CHANGEQTY_ITEM:
      state.cartItems[state.cartItems.findIndex((x) => x.product === action.payload.itemID)].qty = action.payload.qty;
      return { ...state, cartItems: state.cartItems.map((x) => x) };
    default:
      return state;
  }
};
