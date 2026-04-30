import React, { useContext, useRef, useState } from "react";
import "./styles/header.css";
import { CartContext } from "../cart/cartContext";
import type { CartContextType } from "../../types/ICartContext";

interface Props {
  onCartClick: () => void;
}

export const Header: React.FC<Props> = ({ onCartClick }) => {
  const { totalItems, history } = useContext(CartContext) as CartContextType;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  return (
    <header className="header">
      <div className="header__inner">
        {/* ── History Popover Trigger ── */}
        <div className="header__popover-wrap" ref={popoverRef}>
          <button
            className="header__history-btn"
            onClick={() => setPopoverOpen((prev) => !prev)}
            aria-label="Cart history"
            aria-expanded={popoverOpen}
          >
            {/* Clock / History icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </button>

          {popoverOpen && (
            <div
              className="cart-popover"
              role="dialog"
              aria-label="Cart history"
            >
              <div className="cart-popover__header">
                <span className="cart-popover__title">Action History</span>
                <button
                  className="cart-popover__close"
                  onClick={() => setPopoverOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <ul className="cart-popover__list">
                {history.map((item, key) => (
                  <li key={key} className="cart-popover__item">
                    {item.type === "cart" ? (
                      <>
                        <strong>Cart updated:</strong>
                      </>
                    ) : (
                      <>
                        <strong>Coupon applied:</strong> {item.code}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button className="header__cart-btn" onClick={onCartClick}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>

          {totalItems > 0 && (
            <span className="header__cart-badge">{totalItems}</span>
          )}
        </button>
      </div>
    </header>
  );
};
