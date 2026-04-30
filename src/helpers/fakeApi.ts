import type { Product } from "../types/IProduct";

export const fakeApiCall = (
  key: number,
  signal: AbortSignal,
  url: string,
): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    console.log("API call started", url);
    const timer = setTimeout(
      () =>
        resolve(
          url === "1"
            ? [
                {
                  id: 1,
                  name: "Product 1",
                  price: 10,
                  image: "image1.jpg",
                  quantity: 1,
                },
              ]
            : [
                {
                  id: 10,
                  name: "Product 10",
                  price: 20,
                  image: "image10.jpg",
                  quantity: 1,
                },
              ],
        ),
      key,
    );

    signal.onabort = () => {
      console.log("Aborted");
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
    };
  });
};
