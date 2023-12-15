import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as CartEmpty } from "./icons/cart-empty.svg";
import { ReactComponent as CartFull } from "./icons/cart-full.svg";
// import styles from "./CustomerPage.module.scss";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const isCartEmpty = cart.length === 0;

  return (
    isCartEmpty ? <CartEmpty /> : <CartFull />
  );
}

export default Cart;
