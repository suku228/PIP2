import React from "react";
import { CartProvider } from "./components/cart/cartProvider";
import type { routes } from "./types";
import { ProductListingPage } from "./components/product-lisintng-page/productListingPage";
import { Cart } from "./components/cart/cart";
import { useFetch } from "./hooks/useFetch";
import { URL } from "./constants";
import { Header } from "./components/product-lisintng-page/heder";

function App() {
  const [page, setPage] = React.useState<routes>("products");
   const { data: products, loading, error } = useFetch(URL);

   const handleRouteChange: (newPage: routes) => void = (newPage: routes) => {
    setPage(newPage);
  }
  

  const renderPage = () => {
    switch (page) {
      case "products":
        return <ProductListingPage products={products} loading={loading} error={error} />;
      case "cart":
        return <Cart setPage={handleRouteChange} />;
      default:
        return <ProductListingPage products={products} loading={loading} error={error} />;
    }
  };

  return <CartProvider>
    <Header onCartClick={handleRouteChange} />
    {renderPage()}</CartProvider>;
}

export default App;
