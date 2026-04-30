import React from "react";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
    stockCount: number;
  };
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <div className="cart-item">
      <div className="cart-item__img-wrap">
        <img
          src={item.image}
          alt={item.name}
          className="cart-item__img"
          loading="lazy"
        />
      </div>

      <div className="cart-item__info">
        <p className="cart-item__name">{item.name}</p>
        <p className="cart-item__category">{item.category}</p>
        <p className="cart-item__price">
          ₹{(item.price * item.quantity).toFixed(2)}
          {item.quantity > 1 && (
            <span className="cart-item__unit-price">
              (₹{item.price.toFixed(2)} each)
            </span>
          )}
        </p>
        <p className="cart-item__category">Qty left - {item.stockCount - item.quantity}</p>
      </div>

      <div className="cart-item__actions">
        <div className="quantity-control">
          <button onClick={onDecrement} disabled={item.quantity === 1}>
            −
          </button>
          <span>{item.quantity}</span>
          <button disabled={item.quantity >= item.stockCount} onClick={onIncrement}>
            +
          </button>
        </div>

        <button className="cart-item__remove" onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};