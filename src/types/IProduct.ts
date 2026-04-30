export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stockCount: number;
  quantity: number;
  category: string;
}

export interface APIProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Rating {
  rate: number;
  count: number;
}
