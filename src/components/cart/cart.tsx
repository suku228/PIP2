import React, { useContext, useState, useMemo, useEffect } from "react";
import { CartContext } from "./cartContext";
import type { CartContextType } from "../../types/ICartContext";
import { CartItem } from "./cartItem";
import { CouponBox } from "./couponBox";
import { OrderSummary } from "./orderSummary";
import "./styes/cartPage.css";
import { TAX_RATE, VALID_COUPONS } from "../../constants";
import type { routes } from "../../types";

export const Cart: React.FC<{ setPage: (page: routes) => void }> = ({
  setPage,
}) => {
  const { cartItems, updateQuantity, updateAppliedCoupon, appliedCoupon } =
    useContext(CartContext) as CartContextType;

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string>("");

  useEffect(() => {
    if (
      (appliedCoupon && VALID_COUPONS[appliedCoupon]) ||
      appliedCoupon === null
    ) {
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code.");
    }
  }, [appliedCoupon]);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      updateAppliedCoupon(code);
    } else {
      updateAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    updateAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const electronicItemFree = useMemo(() => {
    if (cartItems.length === 0) return 0;
    let electronicItems = cartItems.filter(
      (item) => item.category === "electronics",
    );
    if (electronicItems.length === 0) return 0;
    electronicItems = electronicItems.sort((a, b) => a.price - b.price);
    return Math.min(...electronicItems.map((item) => item.price));
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const coupon = VALID_COUPONS[appliedCoupon];

    switch (coupon.type) {
      case "flat":
        return Math.min(coupon.value, subtotal);

      case "percent":
        return (subtotal * coupon.value) / 100;

      case "bogo":
        return electronicItemFree;

      default:
        return 0;
    }
  }, [appliedCoupon, subtotal, electronicItemFree]);

  const taxableAmount = useMemo(
    () => subtotal - discountAmount,
    [subtotal, discountAmount],
  );
  const tax = useMemo(() => taxableAmount * TAX_RATE, [taxableAmount]);
  const total = useMemo(() => taxableAmount + tax, [taxableAmount, tax]);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <span className="cart-empty__icon">🛒</span>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-page__title">
        <span
          className="cart-page__back-btn"
          onClick={() => setPage("products")}
        >
          Products &gt;
        </span>{" "}
        <span className="cart-page__my-cart"> My Cart </span>
        <span className="cart-page__count">({cartItems.length} items)</span>
      </h2>

      <div className="cart-page__layout">
        <div className="cart-page__left">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                onRemove={() => updateQuantity(item.id, 0)}
              />
            ))}
          </div>

          <CouponBox
            couponInput={couponInput}
            appliedCoupon={appliedCoupon}
            couponLabel={
              appliedCoupon ? VALID_COUPONS[appliedCoupon].label : ""
            }
            couponError={couponError}
            onInputChange={setCouponInput}
            onApply={handleApplyCoupon}
            onRemove={handleRemoveCoupon}
          />
        </div>

        <div className="cart-page__right">
          <OrderSummary
            subtotal={subtotal}
            discountAmount={discountAmount}
            appliedCoupon={appliedCoupon}
            tax={tax}
            total={total}
            taxableAmount={taxableAmount}
          />
        </div>
      </div>
    </div>
  );
};
