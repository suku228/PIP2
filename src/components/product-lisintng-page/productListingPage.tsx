import React from "react";
import "./styles/productListingPage.css";
import { ProductCard } from "./productCard";
// import { useFetch } from "../../hooks/useFetch";
// import { URL } from "../../constants";
import { Header } from "./heder";
import type { routes } from "../../types";
import type { Product } from "../../types/IProduct";

export const ProductListingPage: React.FC<{
  setPage: (page: routes) => void;
  products: Product[] | null;
  loading: boolean;
  error: Error | null;
}> = ({ setPage, products, loading, error }) => {
 
  if (loading) {
    return (
      <div className="product-list__grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton skeleton--img" />
            <div className="skeleton-card__body">
              <div className="skeleton skeleton--text" />
              <div className="skeleton skeleton--text skeleton--short" />
              <div className="skeleton skeleton--btn" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list__empty">
        <p>Failed to load products.</p>
        <small>{error.message}</small>
      </div>
    );
  }

  return (
    <>
    <Header onCartClick={() => setPage("cart")} />
      <div className="product-list__grid">
        {products?.map((product) => (
          <ProductCard id={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
