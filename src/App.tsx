import React, { useEffect } from "react";
import { CartProvider } from "./components/cart/cartProvider";
import type { routes } from "./types";
import { ProductListingPage } from "./components/product-lisintng-page/productListingPage";
import { Cart } from "./components/cart/cart";
import { useFetch } from "./hooks/useFetch";
import { URL } from "./constants";

function App() {
  const [page, setPage] = React.useState<routes>("products");
   const { data: products, loading, error } = useFetch(URL);
  

  const renderPage = () => {
    switch (page) {
      case "products":
        return <ProductListingPage setPage={setPage} products={products} loading={loading} error={error} />;
      case "cart":
        return <Cart setPage={setPage} />;
      default:
        return <ProductListingPage setPage={setPage} products={products} loading={loading} error={error} />;
    }
  };

  return <CartProvider>{renderPage()}</CartProvider>;
}

export default App;
