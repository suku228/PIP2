import type { Product } from "./IProduct";

export interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  appliedCoupon: string | null;
  updateAppliedCoupon: (coupon: string | null) => void;
  history: HistoryEntry[];
}


export type CartSnapshot = {
  type: "cart";
  items: Product[];
  action: ActionType;
};

export type CouponSnapshot = {
  type: "coupon";
  code: string | null;
};

export type HistoryEntry = CartSnapshot | CouponSnapshot;

export type ActionType = "add" | "remove" | "update";