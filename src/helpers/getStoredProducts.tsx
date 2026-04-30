import { CART_STORAGE_KEY } from "../constants";
import type { Product } from "../types/IProduct";

export const getInitialCart = (key: string): Product[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return []; // handles corrupted/invalid JSON gracefully
  }
};