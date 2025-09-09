import { getCreditsByUserUuidPaginated, getUserCreditsCount } from "@/models/credits";
import { getUserCredits } from "@/models/user";
import { serverGetUserUuid } from "@/lib/common";
import { TableColumn } from "@/types/blocks/table";
import TableSlot from "@/components/console/slots/table";
import { Table as TableSlotType } from "@/types/slots/table";
import { getTranslations } from "next-intl/server";
import moment from "moment";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";

interface CreditRecord {
  id: number;
  trans_no: string;
  created_at: string | null;
  user_uuid: string;
  trans_type: string;
  credits: number;
  order_no: string | null;
  expired_at: string | null;
}

const PAGE_SIZE = 10;

export default async function MyCreditsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const t = await getTranslations();

  const user_uuid = await serverGetUserUuid();

  const callbackUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/my-credits`;
  if (!user_uuid) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const { page: pageParam } = await searchParams;
  const currentPage = parseInt(pageParam || "1");

  // 获取用户积分数据、总数和统计信息
  const [credits, totalCredits, user_credits_balance] = await Promise.all([
    getCreditsByUserUuidPaginated(user_uuid, currentPage, PAGE_SIZE),
    getUserCreditsCount(user_uuid),
    getUserCredits(user_uuid)
  ]);

  const totalPages = Math.ceil(totalCredits / PAGE_SIZE);

  const columns: TableColumn[] = [
    { name: "trans_no", title: t("my_credits.table.trans_no") },
    {
      name: "trans_type",
      title: t("my_credits.table.trans_type")
    },
    {
      name: "credits",
      title: t("my_credits.table.credits"),
      callback: (item: CreditRecord) => {
        const isPositive = item.credits > 0;
        return (
          <span className={isPositive ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
            {isPositive ? "+" : ""}{item.credits}
          </span>
        );
      },
    },
    // {
    //   name: "order_no",
    //   title: t("my_credits.table.order_no"),
    //   callback: (item: CreditRecord) => item.order_no || "-",
    // },
    {
      name: "created_at",
      title: t("my_credits.table.created_at"),
      callback: (item: CreditRecord) =>
        moment(item.created_at || "").format("YYYY-MM-DD HH:mm:ss"),
    },
    // {
    //   name: "expired_at",
    //   title: t("my_credits.table.expired_at"),
    //   callback: (item: CreditRecord) =>
    //     item.expired_at ? moment(item.expired_at).format("YYYY-MM-DD HH:mm:ss") : "-",
    // },
  ];


  const table: TableSlotType = {
    title: t("my_credits.title"),
    description: `${t("my_credits.current_balance")}: ${user_credits_balance || 0} `,
    toolbar: {
      items: [
        {
          title: t("my_credits.recharge"),
          icon: "RiBookLine",
          url: "https://ravensaas.io/#pricing",
          variant: "outline",
        }
      ],
    },
    columns: columns,
    data: credits || null,
    empty_message: t("my_credits.no_credits"),
    pagination: totalPages > 1 ? {
      currentPage,
      totalPages,
      showPagination: true,
    } : undefined,

  };

  return (
    <Suspense fallback={<TableSkeleton columns={6} />}>
      <div>
        <TableSlot {...table} />
      </div>
    </Suspense>
  );
}
