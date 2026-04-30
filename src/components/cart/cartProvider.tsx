import React, { useEffect, useState } from "react";
import { CartContext } from "./cartContext";
import type { Product } from "../../types/IProduct";
import { APPLIED_COUPON_KEY, CART_STORAGE_KEY } from "../../constants";
import { getInitialCart } from "../../helpers/getStoredProducts";
import type {
  ActionType,
  CartSnapshot,
  HistoryEntry,
} from "../../types/ICartContext";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Product[]>(
    getInitialCart(CART_STORAGE_KEY),
  );
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(
    localStorage.getItem(APPLIED_COUPON_KEY) || null,
  );
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    localStorage.setItem(APPLIED_COUPON_KEY, appliedCoupon || "");
  }, [appliedCoupon]);

  React.useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    updateCartItemsHistory(cartItems, "add");
    setCartItems((prevItems) => {
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, ignoreHistory: boolean = false) => {
    if (!ignoreHistory) {
      updateCartItemsHistory(cartItems, "remove");
    }
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    updateCartItemsHistory(cartItems, quantity === 0 ? "remove" : "update");
    setCartItems((prevItems) => {
      if (quantity === 0) removeFromCart(id, true);
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
      const slicedHistory = prevHistory.length>=5 ? prevHistory.slice(0, 4) : prevHistory;
      const updatedHistory = [
        { type: "cart", items: newCart, action } as CartSnapshot,
        ...slicedHistory,
      ];
      return updatedHistory;
    });
  };

  const updateCouponHistory = (code: string | null) => {
    setHistory((prevHistory) => [
      ...prevHistory,
      { type: "coupon", code } as HistoryEntry,
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
