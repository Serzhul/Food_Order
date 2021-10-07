import { Fragment, useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartOrderItem from "./CartOrderItem";
import classes from "./Cart.module.scss";
import CartContext from "../../store/cart-context";

const ORDER_MESSAGE = "Your Order Accepted!";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  let orderCheck = cartCtx.isOrdered;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  // Order 버튼 클릭시 주문 내역 표시
  const orderHandler = () => {
    cartCtx.orderCartItems();

    if (orderCheck) {
      props.onHideCart();
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderList = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartOrderItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Fragment>
      {orderCheck && (
        <Modal onClose={orderHandler}>
          <h1>{ORDER_MESSAGE}</h1>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={orderHandler}>
              I GOT IT!
            </button>
          </div>
          {orderList}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
        </Modal>
      )}
      {!orderCheck && (
        <Modal onClose={props.onHideCart}>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.onHideCart}
            >
              Close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default Cart;
