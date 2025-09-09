// 订单状态枚举
export enum OrderStatus {
  Pending = "pending",
  Paid = "paid",
  Failed = "failed",
  Refunded = "refunded",
  Cancelled = "cancelled",
}

// 订单记录类型
export interface OrderRecord {
  id: number;
  created_at: string;
  updated_at: string;
  user_uuid: string;
  user_email?: string;
  order_no: string;
  amount: number;
  status: OrderStatus;
  payment_method: string;
  payment_id?: string;
  product_id: string;
  product_name?: string;
  coupon_code?: string;
  discount_amount?: number;
  metadata?: Record<string, unknown>;
}
