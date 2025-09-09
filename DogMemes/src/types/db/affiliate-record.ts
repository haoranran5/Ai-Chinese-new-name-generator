// 邀请状态常量
export enum AffiliateStatus {
  Pending = "pending", // 待处理
  Completed = "completed", // 已完成
}

// 邀请奖励比例常量
export enum AffiliateRewardPercent {
  Invited = 0, // 邀请注册奖励比例
  Paied = 20, // 邀请支付奖励比例
}

// 邀请奖励金额常量
export enum AffiliateRewardAmount {
  Invited = 0, // 邀请注册奖励金额
  Paied = 50, // 邀请支付奖励金额
}

export interface AffiliateRecord {
  id: number;
  user_uuid: string;
  invited_by: string;
  created_at: string;
  status: AffiliateStatus;
  paid_order_no: string;
  paid_amount: number;
  reward_percent: number;
  reward_amount: number;
  user_email?: string;
  inviter_email?: string;
  user_avatar?: string;
  user_nickname?: string;
  inviter_avatar?: string;
  inviter_nickname?: string;
}
