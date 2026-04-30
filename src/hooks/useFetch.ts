import { type Product } from "./../types/IProduct";
import React from "react";
import productsMock from "../mock-data/products.json";
import type { FetchData } from "../types/IFetchData";
// import { mapProduct } from "../helpers/productMapper";


export const useFetch = (url: string): FetchData => {
  const [data, setData] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    const { signal } = controller;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        await response.json();
        setData(productsMock as Product[]);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        } else if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};
