import React, { useContext } from "react";
import type { Product } from "../../types/IProduct";
import "./styles/productCard.css";
import { CartContext } from "../cart/cartContext";
import type { CartContextType } from "../../types/ICartContext";

interface Props {
  id: number;
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ id, product }) => {
  const { addToCart, updateQuantity, cartItems } = useContext(
    CartContext,
  ) as CartContextType;

  const cartItem = cartItems.find((item) => item.id === product.id);
  const qty = cartItem?.quantity ?? 0;

  return (
    <div className="product-card" key={id}>
      <div className="product-card__img-wrap">
        <img
          src={product?.image}
          alt={product?.name}
          className="product-card__img"
          loading="lazy"
        />
      </div>

      <div className="product-card__body">
        <p className="product-card__name">{product?.name}</p>
        <p className="product-card__price">₹{product?.price.toFixed(2)}</p>
        <p className="product-card__price">{product?.category}</p>
        <p className="product-card__price">
          Qty left - {product?.stockCount - qty}
        </p>
      </div>

      {qty === 0 ? (
        <button
          className={`product-card__btn`}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      ) : (
        <div className="quantity-control">
          <button
            onClick={() => updateQuantity(product.id, qty - 1)}
          >
            −
          </button>
          <span>{qty}</span>
          <button
            disabled={qty >= product.stockCount}
            onClick={() => updateQuantity(product.id, qty + 1)}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};
