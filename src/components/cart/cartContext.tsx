import React from "react";
import type { CartContextType } from "../../types/ICartContext";


export const CartContext: React.Context<CartContextType | null> = React.createContext<CartContextType | null>(null);
