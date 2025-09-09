import { fetchOrdersPaginated, fetchOrderStats, getTotalOrdersCount } from "@/models/order";
import { checkIsAdminAndLogin } from "@/lib/common";
import { TableColumn } from "@/types/blocks/table";
import { formatDate } from "@/lib/utils";
import { Table as TableSlotType } from "@/types/slots/table";
import TableSlot from "@/components/admin/dashboard/slots/table";

import { redirect } from "next/navigation";

// 强制动态渲染，因为使用了 checkIsAdminAndLogin (getServerSession)
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 10;

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const isAdmin = await checkIsAdminAndLogin();
  // 如果不是管理员，则不显示内容
  if (!isAdmin) return redirect("/auth/signin");

  const { page: pageParam } = await searchParams;
  const currentPage = parseInt(pageParam || "1");

  // 获取订单数据、统计数据和总数
  const [orders, stats, totalOrders] = await Promise.all([
    fetchOrdersPaginated(currentPage, PAGE_SIZE),
    fetchOrderStats(),
    getTotalOrdersCount(),
  ]);

  const totalPages = Math.ceil(totalOrders / PAGE_SIZE);

  const columns: TableColumn[] = [
    // { name: "id", title: "ID" },
    {
      name: "order_no",
      title: "订单号",
      callback: (row) => row.order_no,
    },
    {
      name: "user_email",
      title: "用户",
      callback: (row) => (
        <>
          <div className="font-medium dark:text-gray-200">
            {row.user_email || "未知用户"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {row.user_uuid}
          </div>
        </>
      ),
    },
    {
      name: "product_name",
      title: "产品",
      callback: (row) => row.product_name || row.product_id,
    },
    {
      name: "amount",
      title: "金额",
      callback: (row) => `$${(row.amount / 100).toFixed(2)}`,
    },
    {
      name: "status",
      title: "状态",
    },
    {
      name: "payment_method",
      title: "支付方式",
      callback: (row) => row.payment_method || "-",
    },
    {
      name: "coupon_code",
      title: "优惠码",
      callback: (row) => row.coupon_code || "-",
    },
    {
      name: "discount_amount",
      title: "折扣",
      callback: (row) =>
        row.discount_amount ? `$${row.discount_amount.toFixed(2)}` : "-",
    },
     {
      name: "created_at",
      title: "创建时间",
      callback: (row) => formatDate(row.created_at),
    },
    // {
    //   name: "actions",
    //   title: "操作",
    //   // callback: (row) => (
    //   //   <Button
    //   //     variant="ghost"
    //   //     size="sm"
    //   //     onClick={(e) => {
    //   //       e.stopPropagation();
    //   //       setSelectedOrder(row);
    //   //       setShowOrderDetails(true);
    //   //     }}
    //   //   >
    //   //     查看详情
    //   //   </Button>
    //   // ),
    // },
  ];

  const table: TableSlotType = {
    title: "订单管理",
    description: `共 ${totalOrders} 个订单，当前第 ${currentPage} 页，每页显示 ${PAGE_SIZE} 个`,
    columns,
    data: orders,
    empty_message: "暂无订单数据",
    pagination: {
      currentPage,
      totalPages,
      showPagination: true,
    },
  };

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-gray-900 p-6 transition-colors duration-200">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            总订单数
          </h2>
          <p className="text-3xl font-bold dark:text-white">
            {totalOrders}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-gray-900 p-6 transition-colors duration-200">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            已支付订单数
          </h2>
          <p className="text-3xl font-bold dark:text-white">
            {totalOrders - stats.pendingOrders}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-gray-900 p-6 transition-colors duration-200">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            待支付订单数
          </h2>
          <p className="text-3xl font-bold dark:text-white">
            {stats.pendingOrders}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-gray-900 p-6 transition-colors duration-200">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            总收入
          </h2>
          <p className="text-3xl font-bold dark:text-white">
            ${stats.totalRevenue}
          </p>
        </div>
      </div>

      <TableSlot {...table} />
    </div>
  );
}
