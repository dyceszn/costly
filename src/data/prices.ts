type price = {
  id: string;
  productId: string;
  shopId?: string; // is optional because it can be submitted by a user without a shop
  amount: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
