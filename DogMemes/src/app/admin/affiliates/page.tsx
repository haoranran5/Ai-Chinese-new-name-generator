import { TableColumn } from "@/types/blocks/table";
import TableSlot from "@/components/admin/dashboard/slots/table";
import { Table as TableSlotType, Toolbar } from "@/types/slots/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/time";
import { AffiliateStatus } from "@/types/db/affiliate-record";
import { getAllAffiliatesPaginated, getAffiliatesTotal } from "@/models/affiliate";
import { checkIsAdminAndLogin } from "@/lib/common";
import { redirect } from "next/navigation";
import { getUserByUuid } from "@/models/user";
import AvatarWithFallback from "@/components/ui/avatar-with-fallback";

// 强制动态渲染，因为使用了 checkIsAdminAndLogin (getServerSession)
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 10;

export default async function AffiliatesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const isAdmin = await checkIsAdminAndLogin();
  if (!isAdmin) return redirect("/auth/signin");

  const { page: pageParam } = await searchParams;
  const currentPage = parseInt(pageParam || "1");

  // 获取邀请数据和总数
  const [affiliates, totalAffiliates] = await Promise.all([
    getAllAffiliatesPaginated(currentPage, PAGE_SIZE),
    getAffiliatesTotal(),
  ]);

  const totalPages = Math.ceil(totalAffiliates / PAGE_SIZE);
  const usersData = await getUserByUuid([
    ...affiliates.map((a) => a.user_uuid),
    ...affiliates.map((a) => a.invited_by).filter((uuid): uuid is string => uuid !== null),
  ]);

  // 3. 创建UUID到用户信息的映射
  const userInfoMap = new Map();
  if (usersData) {
    usersData.forEach((user) => {
      userInfoMap.set(user.uuid, {
        email: user.email,
        avatar_url: user.avatar_url,
        nickname: user.nickname,
      });
    });
  }

  // 4. 合并数据
  const enrichedAffiliates = affiliates.map((affiliate) => {
    const userInfo = userInfoMap.get(affiliate.user_uuid);
    const inviterInfo = userInfoMap.get(affiliate.invited_by);

    return {
      ...affiliate,
      user_email: userInfo?.email || "未知用户",
      user_avatar: userInfo?.avatar_url || "",
      user_nickname: userInfo?.nickname || "",
      inviter_email: inviterInfo?.email || "未知用户",
      inviter_avatar: inviterInfo?.avatar_url || "",
      inviter_nickname: inviterInfo?.nickname || "",
    };
  });

  // 计算统计数据
  const totalInviteCount = enrichedAffiliates.length;
  const totalPaidCount = enrichedAffiliates.filter(
    (a) => a.status === AffiliateStatus.Completed
  ).length;
  const totalRewardAmount = enrichedAffiliates.reduce(
    (sum, a) => sum + (a.reward_amount || 0),
      0
    ) || 0;

  const stats = {
    totalInviteCount,
    totalPaidCount,
    totalRewardAmount,
  };

  const columns: TableColumn[] = [
    // { name: "id", title: "ID" },
   
    {
      name: "user_email",
      title: "User",
      callback: (row) => (
        <div className="flex items-center space-x-3">
          <AvatarWithFallback
            src={row.user_avatar || "/imgs/head/default.png"}
            alt={row.user_nickname || row.user_email || "User"}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="font-medium dark:text-gray-200">
            <div>{row.user_nickname || row.user_email || "Unknown User"}</div>
            {/* {row.user_nickname && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {row.user_email}
              </div>
            )} */}
          </div>
        </div>
      ),
    },
    {
      name: "inviter_email",
      title: "Invited By",
      callback: (row) => (
        <div className="flex items-center space-x-3">
          {row.inviter_avatar || row.inviter_email !== "Unknown User" ? (
            <AvatarWithFallback
              src={row.inviter_avatar || "/imgs/head/default.png"}
              alt={row.inviter_nickname || row.inviter_email || "Invited By"}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-xs text-gray-600 dark:text-gray-300">?</span>
            </div>
          )}
          <div className="font-medium dark:text-gray-200">
            <div>{row.inviter_nickname || row.inviter_email || "未知用户"}</div>
            {/* {row.inviter_nickname && row.inviter_email && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {row.inviter_email}
              </div>
            )} */}
          </div>
        </div>
      ),
    },
    {
      name: "status",
      title: "Status",
      callback: (row) => (
        <div className="flex items-center min-w-[60px]">
          <Badge
            variant={
              row.status === AffiliateStatus.Completed ? "default" : "secondary"
            }
          >
            {row.status === AffiliateStatus.Completed ? "已支付" : "待支付"}
          </Badge>
        </div>
      ),
    },
    {
      name: "paid_order_no",
      title: "Paid Order No",
      callback: (row) => row.paid_order_no || "-",
    },
    {
      name: "paid_amount",
      title: "Paid Amount",
      callback: (row) => `$${((row.paid_amount || 0) / 100).toFixed(2)}`,
    },
    {
      name: "reward_amount",
      title: "Reward Amount",
      callback: (row) => `$${((row.reward_amount || 0) / 100).toFixed(2)}`,
    },
     {
      name: "created_at",
      title: "Created At",
      callback: (row) => (
        <div className="min-w-[120px]">
          {formatDate(row.created_at)}
        </div>
      ),
    },
  ];

  const toolbar: Toolbar = {
    items: [],
  };

  const table: TableSlotType = {
    title: "邀请管理",
    description: `共 ${totalAffiliates} 条邀请记录，当前第 ${currentPage} 页，每页显示 ${PAGE_SIZE} 条`,
    columns,
    data: enrichedAffiliates,
    empty_message: "暂无邀请记录",
    toolbar,
    pagination: {
      currentPage,
      totalPages,
      showPagination: true,
    },
  };

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-gray-900 p-6 transition-colors duration-200">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            总邀请数
          </h2>
          <p className="text-3xl font-bold dark:text-white">
            {stats.totalInviteCount}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-gray-900 p-6 transition-colors duration-200">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            已支付邀请数
          </h2>
          <p className="text-3xl font-bold dark:text-white">
            {stats.totalPaidCount}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-gray-900 p-6 transition-colors duration-200">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            总奖励金额
          </h2>
          <p className="text-3xl font-bold dark:text-white">
            ${(stats.totalRewardAmount / 100).toFixed(2)}
          </p>
        </div>
      </div>

      {/* 表格组件 */}
      <TableSlot {...table} />
    </div>
  );
}
