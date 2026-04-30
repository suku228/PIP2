import React, { useEffect, useState } from "react";
import { CartContext } from "./cartContext";
import type { Product } from "../../types/IProduct";
import { APPLIED_COUPON_KEY, CART_STORAGE_KEY } from "../../constants";
import { getInitialCart } from "../../helpers/getStoredProducts";
import type { ActionType, HistoryEntry } from "../../types/ICartContext";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Product[]>(getInitialCart(CART_STORAGE_KEY));
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(localStorage.getItem(APPLIED_COUPON_KEY) || null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    localStorage.setItem(APPLIED_COUPON_KEY, appliedCoupon || "");
  }, [appliedCoupon]);

  React.useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {

    setCartItems((prevItems) => {
      updateCartItemsHistory(prevItems, "add");
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      updateCartItemsHistory(prevItems, "remove");
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity === 0) removeFromCart(id);
      updateCartItemsHistory(prevItems, "update");
      const newCartItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
      return newCartItems;
    });
  };


  const updateAppliedCoupon = (coupon: string | null) => {
    setAppliedCoupon(coupon);
    updateCouponHistory(coupon);
  };

  const updateCartItemsHistory = (newCart: Product[], action: ActionType) => {
    setHistory((prevHistory) => {
      const updatedHistory = [
      ...prevHistory,
      { type: "cart", items: newCart, action },
    ];
      console.log("Updated cart history:", updatedHistory);
      return updatedHistory;
    });
  };

  const updateCouponHistory = (code: string | null) => {
    setHistory((prevHistory) => [
      ...prevHistory,
      { type: "coupon", code },
    ]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart,
          totalItems,
          totalPrice,
          appliedCoupon,
          updateAppliedCoupon,
          history,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};
