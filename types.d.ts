type ProductType = {
  id: number;
  createdAt: string | null;
  updatedAt: string | null;
  title: string;
  description: string;
  quantity: number;
  amount: string;
  userId: number;
};

type PaginationState = {
  currentPage: number;
  limit: number;
  totalPagesCount?: number; // Optional property
};
