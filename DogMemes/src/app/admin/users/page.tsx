import { TableColumn } from "@/types/blocks/table";
import TableSlot from "@/components/admin/dashboard/slots/table";
import { Table as TableSlotType } from "@/types/slots/table";
import moment from "moment";
import { getUsers, getTotalUsersCount } from "@/models/user";
import { checkIsAdminAndLogin } from "@/lib/common";
import { redirect } from "next/navigation";

// 强制动态渲染，因为使用了 checkIsAdminAndLogin (getServerSession)
export const dynamic = 'force-dynamic';

export default async function Users({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const isAdmin = await checkIsAdminAndLogin();
  // 如果不是管理员，则不显示内容
  if (!isAdmin) return redirect("/auth/signin");

  const { page: pageParam } = await searchParams;
  const currentPage = parseInt(pageParam || "1");

  const PAGE_SIZE = 10;

  const [users, totalUsers] = await Promise.all([
    getUsers(currentPage, PAGE_SIZE),
    getTotalUsersCount(),
  ]);

  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  const columns: TableColumn[] = [
    { name: "uuid", title: "UUID" },
    { name: "email", title: "Email" },
    { name: "nickname", title: "Name" },
    {
      name: "avatar_url",
      title: "Avatar",
      callback: (row) => (
        <img src={row.avatar_url || "/imgs/head/default.png"} className="w-10 h-10 rounded-full" />
      ),
    },
    {
      name: "created_at",
      title: "Created At",
      callback: (row) => moment(row.created_at).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  const table: TableSlotType = {
    title: "用户管理",
    description: `共 ${totalUsers} 个用户，当前第 ${currentPage} 页，每页显示 ${PAGE_SIZE} 个`,
    columns,
    data: users || null,
    pagination: {
      currentPage: currentPage,
      totalPages: totalPages,
      showPagination: true,
    },
  };

  return <TableSlot {...table} />;
}
