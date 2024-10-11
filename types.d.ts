interface ServerToken {
  email: string;
  sub: string;
  id: number;
  username: string;
  expires: number;
  iat: number;
  exp: number;
  jti: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  amount: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}
