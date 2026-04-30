import type { Product } from "./IProduct";

export interface FetchData {
  data: Product[] | null;
  loading: boolean;
  error: Error | null;
}
