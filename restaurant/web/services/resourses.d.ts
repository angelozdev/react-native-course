export interface Dish {
  id: string;
  price: number;
  name: string;
  description: string;
  category: string;
  image: string | null;
  available: boolean;
}

export type CartItem = Dish & { quantity: number };

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: number;
  status: "pending" | "delivered" | "cancelled";
  count: number;
};
