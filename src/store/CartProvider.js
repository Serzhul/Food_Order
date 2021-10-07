import { useReducer } from "react";
import CartContext from "./cart-context";

const CART_ADD = "cart/ADD";
const CART_REMOVE = "cart/REMOVE";
const CART_ORDER = "cart/ORDER";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  isOrdered: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ADD:
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case CART_REMOVE: {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case CART_ORDER: {
      return {
        ...state,
        isOrdered: !state.isOrdered,
      };
    }

    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCarHandler = (item) => {
    dispatchCartAction({ type: CART_ADD, item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: CART_REMOVE, id });
  };

  const orderItemHandler = () => {
    dispatchCartAction({ type: CART_ORDER });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    isOrdered: cartState.isOrdered,
    addItem: addItemToCarHandler,
    removeItem: removeItemFromCartHandler,
    orderCartItems: orderItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
