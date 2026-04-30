export const URL = "https://jsonplaceholder.typicode.com/users";

export type CouponType = "flat" | "percent" | "bogo";

export interface Coupon {
  type: CouponType;
  value: number; 
  label: string; 
}

export const VALID_COUPONS: Record<string, Coupon> = {
  SAVE100: { type: "flat",    value: 100, label: "₹100 off"              },
  HALF:    { type: "percent", value: 50,  label: "50% off"               },
  BOGO:    { type: "bogo",    value: 0,   label: "second item in Electronics free"    },
};

export const TAX_RATE = 0.18; 

export const CART_STORAGE_KEY = "my_cart_items";

export const APPLIED_COUPON_KEY = "my_applied_coupon";