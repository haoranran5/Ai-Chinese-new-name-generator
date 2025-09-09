import { getOrdersByUserUuidPaginated, getUserOrdersCount } from "@/models/order";
import { serverGetUserUuid } from "@/lib/common";

import { TableColumn } from "@/types/blocks/table";
import TableSlot from "@/components/console/slots/table";
import { Table as TableSlotType } from "@/types/slots/table";
import { getTranslations } from "next-intl/server";
import moment from "moment";
import { redirect } from "next/navigation";
import { Order } from "@/types/order";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { ContinuePaymentButton } from "@/components/payment/continue-payment-button";

const PAGE_SIZE = 10;

export default async function MyOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const t = await getTranslations();

  const user_uuid = await serverGetUserUuid();

  const callbackUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/my-orders`;
  if (!user_uuid) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const { page: pageParam } = await searchParams;
  const currentPage = parseInt(pageParam || "1");

  // 获取用户订单数据和总数
  const [orders, totalOrders] = await Promise.all([
    getOrdersByUserUuidPaginated(user_uuid, currentPage, PAGE_SIZE),
    getUserOrdersCount(user_uuid),
  ]);

  const totalPages = Math.ceil(totalOrders / PAGE_SIZE);

  const columns: TableColumn[] = [
    { name: "order_no", title: t("my_orders.table.order_no") },
    { name: "user_email", title: t("my_orders.table.email") },
    { name: "product_name", title: t("my_orders.table.product_name") },
    {
      name: "amount",
      title: t("my_orders.table.amount"),
      callback: (item: Order) =>
        `${item.currency.toUpperCase() === "CNY" ? "¥" : "$"} ${item.amount / 100}`,
    },
    {
      name: "status",
      title: t("my_orders.table.status"),
      callback: (item: Order) => {
        return item.status === "pending" ? (
          <span className="text-yellow-500 font-bold">Pending</span>
        ) : item.status === "paid" ? (
          <span className="text-green-500 font-bold">Paid</span>
        ) : item.status === "activated" ? (
          <span className="text-green-500 font-bold">Activated</span>
        ) : item.status === "closed" ? (
          <span className="text-gray-400 font-bold">Closed</span>
        ) : (
          <span className="text-gray-400">-</span>
        );
      },
    },
    {
      name: "created_at",
      title: t("my_orders.table.created_at"),
      callback: (item: Order) =>
        moment(item.created_at || "").format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      name: "actions",
      title: t("my_orders.table.actions"),
      callback: (item: Order) => {
        if (item.status === "paid") {
          return (
            <a
              href={`/users/activate-order?orderId=${item.order_no}`}
              className="text-blue-600 underline hover:no-underline"
            >
              To Activate
            </a>
          );
        }
        if (item.status === "activated") {
          // return <span className="text-green-500">Activated</span>;
           return <span className="text-gray-400">-</span>;
        }
        if (item.status === "pending") {
          return (
            <ContinuePaymentButton orderNo={item.order_no} />
          );
        }
        if (item.status === "paid") {
          return <span className="text-green-500">Paid</span>;
        }
        return <span className="text-gray-400">-</span>;
      },
    },
  ];

  const table: TableSlotType = {
    title: t("my_orders.title"),
    // toolbar: {
    //   items: [
    //     {
    //       title: t("my_orders.read_docs"),
    //       icon: "RiBookLine",
    //       url: "https://docs.RavenSaaS.ai",
    //       target: "_blank",
    //       variant: "outline",
    //     },
    //     {
    //       title: t("my_orders.join_discord"),
    //       icon: "RiDiscordFill",
    //       url: "https://discord.gg/HQNnrzjZQS",
    //       target: "_blank",
    //     },
    //   ],
    // },
    columns: columns,
    data: orders || null,
    empty_message: t("my_orders.no_orders"),
    pagination: totalPages > 1 ? {
      currentPage,
      totalPages,
      showPagination: true,
    } : undefined,
  };

  return (
    <Suspense fallback={<TableSkeleton columns={6} />}>
      <TableSlot {...table} />
    </Suspense>
  );
}
