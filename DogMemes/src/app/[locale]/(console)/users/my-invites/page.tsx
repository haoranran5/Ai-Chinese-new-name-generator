import { Navbar } from "@/components/blocks/navbar";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { InviteCodeCard } from "./components/InviteCodeCard";
import { StatsCard } from "./components/StatsCard";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { serverGetUserUuid } from "@/lib/common";
import { findUserByUuid, getInvitedUsersByInviter, getUserBasedInviteStats } from "@/models/user";
import { findAffiliatesByUserUuid } from "@/models/affiliate";
import { AffiliateStatus } from "@/types/db/affiliate-record";
import { getTranslations } from "next-intl/server";
import { affiliates } from "@/db/schema";
import { TableColumn } from "@/types/blocks/table";
import TableSlot from "@/components/console/slots/table";
import { Table as TableSlotType } from "@/types/slots/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/time";

const PAGE_SIZE = 10;

// 扩展的邀请记录类型，包含合并后的用户信息
type ExtendedInviteRecord = typeof affiliates.$inferSelect & {
  user_email?: string;
  inviter_nickname?: string;
  inviter_avatar?: string | null;
};

export default async function MyInvitesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const t = await getTranslations();

  const userUuid = await serverGetUserUuid();
  const callbackUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/my-orders`;
  if (!userUuid) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const { page: pageParam } = await searchParams;
  const currentPage = parseInt(pageParam || "1");

  return (
    <>
      <Navbar currentPage="my-invites" />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">{t("my_invites.title")}</h1>

          <Suspense fallback={<LoadingSkeleton />}>
            <InvitesContent userUuid={userUuid} currentPage={currentPage} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

// 新组件，负责数据加载
async function InvitesContent({ userUuid, currentPage }: { userUuid: string; currentPage: number }) {
  // 获取被邀请的用户列表（直接从 user 表查询）
  const invitedUsers = await getInvitedUsersByInviter(userUuid);

  // 获取 affiliate 记录（支付信息）
  const affiliateRecords = await findAffiliatesByUserUuid(userUuid);

  // 获取基于用户表的统计信息
  const stats = await getUserBasedInviteStats(userUuid);
  const user = await findUserByUuid(userUuid);

  // 创建 affiliate 记录的映射，以便快速查找
  const affiliateMap = new Map();
  affiliateRecords?.forEach((affiliate) => {
    affiliateMap.set(affiliate.user_uuid, affiliate);
  });

  // 将用户数据与 affiliate 数据合并
  const allInviteRecords: ExtendedInviteRecord[] = [];

  // 遍历所有被邀请的用户
  invitedUsers?.forEach((invitedUser, index) => {
    // 获取该用户的所有支付记录
    const userAffiliateRecords = affiliateRecords?.filter(
      record => record.user_uuid === invitedUser.uuid
    ) || [];

    if (userAffiliateRecords.length === 0) {
      // 如果没有支付记录，添加一条待处理记录
      allInviteRecords.push({
        id: index + 1,
        user_uuid: invitedUser.uuid,
        user_email: invitedUser.email,
        inviter_nickname: invitedUser.nickname,
        inviter_avatar: invitedUser.avatar_url,
        invited_by: userUuid,
        status: AffiliateStatus.Pending,
        paid_order_no: "",
        paid_amount: 0,
        reward_percent: 0,
        reward_amount: 0,
        created_at: invitedUser.created_at,
      });
    } else {
      // 如果有支付记录，添加所有支付记录
      userAffiliateRecords.forEach(affiliateRecord => {
        allInviteRecords.push({
          id: affiliateRecord.id,
          user_uuid: invitedUser.uuid,
          user_email: invitedUser.email,
          inviter_nickname: invitedUser.nickname,
          inviter_avatar: invitedUser.avatar_url,
          invited_by: userUuid,
          status: affiliateRecord.status,
          paid_order_no: affiliateRecord.paid_order_no,
          paid_amount: affiliateRecord.paid_amount || 0,
          reward_percent: affiliateRecord.reward_percent || 0,
          reward_amount: affiliateRecord.reward_amount || 0,
          created_at: affiliateRecord.created_at,
        });
      });
    }
  });

  // 计算分页
  const totalRecords = allInviteRecords.length;
  const totalPages = Math.ceil(totalRecords / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const inviteRecords = allInviteRecords.slice(startIndex, endIndex);

  // 获取翻译函数
  const t = await getTranslations();

  // 定义表格列
  const columns: TableColumn[] = [
    {
      name: "user_email",
      title: t("my_invites.table.user"),
      callback: (row: ExtendedInviteRecord) => (
        <div className="flex items-center space-x-3">
          <img
            src={row.inviter_avatar || "/imgs/head/default.png"}
            alt={row.inviter_nickname || row.user_email || "User"}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="font-medium">
            <div>{row.inviter_nickname || row.user_email || "Unknown User"}</div>
          </div>
        </div>
      ),
    },
    {
      name: "status",
      title: t("my_invites.table.status"),
      callback: (row: ExtendedInviteRecord) => (
        <Badge
          variant={row.status === AffiliateStatus.Completed ? "default" : "secondary"}
        >
          {row.status === AffiliateStatus.Completed ? t("my_invites.table.completed") : t("my_invites.table.pending")}
        </Badge>
      ),
    },
    {
      name: "paid_order_no",
      title: t("my_invites.table.order_no"),
      callback: (row: ExtendedInviteRecord) => row.paid_order_no || "-",
    },
    {
      name: "paid_amount",
      title: t("my_invites.table.paid_amount"),
      callback: (row: ExtendedInviteRecord) => `$${((row.paid_amount || 0) / 100).toFixed(2)}`,
    },
    {
      name: "reward_amount",
      title: t("my_invites.table.reward_amount"),
      callback: (row: ExtendedInviteRecord) => `$${((row.reward_amount || 0) / 100).toFixed(2)}`,
    },
    {
      name: "created_at",
      title: t("my_invites.table.created_at"),
      callback: (row: ExtendedInviteRecord) => formatDate(row.created_at),
    },
  ];

  // 表格配置
  const table: TableSlotType = {
    title: t("my_invites.invite_records"),
    // description: totalRecords > 0
    //   ? `共 ${totalRecords} 条邀请记录，当前第 ${currentPage} 页`
    //   : t("my_invites.no_invites"),
    columns,
    data: inviteRecords,
    empty_message: t("my_invites.no_invites"),
    pagination: totalPages > 1 ? {
      currentPage,
      totalPages,
      showPagination: true,
    } : undefined,
  };

  return (
    <div className="space-y-8">
      {/* 上方：邀请码和统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InviteCodeCard user={user} />
        <StatsCard stats={stats} />
      </div>

      {/* 下方：邀请记录表格 */}
      <div className="w-full">
        <TableSlot {...table} />
      </div>
    </div>
  );
}
