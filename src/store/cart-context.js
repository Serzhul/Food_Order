import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  isOrdered: false,
  addItem: (item) => {},
  removeItem: (id) => {},
  orderCartItems: () => {},
});

export default CartContext;
