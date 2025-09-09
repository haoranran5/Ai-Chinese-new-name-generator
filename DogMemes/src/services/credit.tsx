import { insertCredit } from "@/models/credits";
import { updateUserCredits, getUserCredits } from "@/models/user";

export async function increaseCredits(
  userUuid: string,
  creditAmount: number,
  trans_type: string,
  expired_at: string | null,
) {
    // 加积分
    await insertCredit({
      user_uuid: userUuid,
      trans_type: trans_type,
      credits: creditAmount,
      expired_at: expired_at,
      trans_no: String(Date.now() * 1000 + Math.floor(Math.random() * 1000)),
      created_at: new Date().toISOString(),
    });
  
    // 更新用户表
    await updateUserCredits(userUuid, creditAmount );

    return true;
}

export async function decreaseCredits(
  userUuid: string,
  creditAmount: number,
  trans_type: string,
) {
  // 检查用户积分是否足够
  const userCredits = await getUserCredits(userUuid);
  if (userCredits < creditAmount) {
    return false;
  }

  // 减积分
  await insertCredit({
    user_uuid: userUuid,
    trans_type: trans_type,
    credits: -creditAmount,
    trans_no: String(Date.now() * 1000 + Math.floor(Math.random() * 1000)),
    created_at: new Date().toISOString(),
  });

  // 更新用户表
  await updateUserCredits(userUuid, -creditAmount);

  return true;
}
