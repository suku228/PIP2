import React from "react";

interface OrderSummaryProps {
  subtotal: number;
  discountAmount: number;
  appliedCoupon: string | null;
  tax: number;
  total: number;
  taxableAmount: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  discountAmount,
  appliedCoupon,
  tax,
  total,
  taxableAmount
}) => {
  return (
    <div className="order-summary">
      <h3 className="order-summary__title">Order Summary</h3>

      <div className="order-summary__row">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      {discountAmount > 0 && (
        <div className="order-summary__row order-summary__row--discount">
          <span>Coupon ({appliedCoupon})</span>
          <span>− ₹{discountAmount.toFixed(2)}</span>
        </div>
      )}

      <div className="order-summary__row">
        <span>Taxable Amount</span>
        <span>₹{taxableAmount.toFixed(2)}</span>
      </div>

      <div className="order-summary__row">
        <span>GST (18%)</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>     

      <div className="order-summary__divider" />

      <div className="order-summary__row order-summary__row--total">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <button className="order-summary__checkout-btn">
        Proceed to Checkout
      </button>

    </div>
  );
};