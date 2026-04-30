import React from "react";

interface CouponBoxProps {
  couponInput: string;
  appliedCoupon: string | null;
  couponLabel: string;
  couponError: string;
  onInputChange: (val: string) => void;
  onApply: () => void;
  onRemove: () => void;
}

export const CouponBox: React.FC<CouponBoxProps> = ({
  couponInput,
  appliedCoupon,
  couponLabel,
  couponError,
  onInputChange,
  onApply,
  onRemove,
}) => {

  return (
    <div className="coupon-box">
      <p className="coupon-box__label"> Apply Coupon</p>

      {appliedCoupon ? (
        <div className="coupon-box__applied">
          <span className="coupon-box__badge">
             <strong>{appliedCoupon}</strong> — {couponLabel}
          </span>
          <button className="coupon-box__remove-btn" onClick={onRemove}>
            ✕ Remove
          </button>
        </div>
      ) : (
        <>
          <div className="coupon-box__row">
            <input
              className="coupon-box__input"
              type="text"
              placeholder="Enter coupon code"
              value={couponInput}
              onChange={(e) => onInputChange(e.target.value)}
            />
            <button className="coupon-box__apply-btn" onClick={onApply}>
              Apply
            </button>
          </div>
          {couponError && (
            <p className="coupon-box__error">{couponError}</p>
          )}
          <p className="coupon-box__hint">Try: SAVE100, HALF, BOGO</p>
        </>
      )}
    </div>
  );
};