import type { APIProduct, Product } from "../types/IProduct";

export const mapProduct = (item: APIProduct): Product => ({
  id: item.id,
  name: item.title,
  price: item.price,
  image: item.image,
  stockCount: item.rating.count,
  category: item.category,
  quantity: 0,              // ✅ defaults to 0 unless passed
});