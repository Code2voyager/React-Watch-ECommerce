import React, { createContext, useReducer, useContext } from 'react';
import { useAuth } from "../Authenticate/auth";


const CartContext = createContext();


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      console.log("Action Payload:", action.payload); 
      const existItem = state.find(item => item.productname === action.payload.productname);
      if (existItem) {
        return state.map(item =>
          item.productname === action.payload.productname
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: action.payload.quantity || 1 }];

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.productname !== action.payload.productname);

    default:
      return state;
  }
};
// calculate total quantity of items 
const getCartCount = (cart) => {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, dispatch] = useReducer(cartReducer, []);
  const cartcount = getCartCount(cart);
 
  return (
    <CartContext.Provider value={{ cart, dispatch,cartcount,isAuthenticated }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  return useContext(CartContext);
};
