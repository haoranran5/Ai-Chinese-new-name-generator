export interface Order {
  id?: number;
  order_no: string;
  created_at: string;
  user_uuid: string;
  user_email: string;
  amount: number;
  interval?: string | null;
  expired_at?: string | null;
  status: string;
  credits: number | null;
  currency: string;
  product_id: string | null;
  product_name: string | null;
  valid_months: number | null;
  order_detail?: string | null;
  sub_id?: string | null;
  sub_interval_count?: number | null;
  sub_cycle_anchor?: string | null;
  sub_period_end?: string | null;
  sub_period_start?: string | null;
  sub_times?: number | null;
  stripe_session_id?: string | null;
  paid_at?: string | null;
  paid_email: string | null;
  paid_detail?: string | null;
  payment_link?: string | null;
}
