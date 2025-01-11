import { OrderStatus } from '@prisma/client';

export interface OrderWithProducts {
  OrderItem: {
    id: string;
    name: string;
    productId: number;
    quantity: number;
    price: number;
    orderId: string | null;
  }[];
  id: string;
  totalAmount: number;
  totalItems: number;
  status: OrderStatus;
  paid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
