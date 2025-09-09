import { TableColumn } from "@/types/blocks/table";
import TableSlot from "@/components/admin/dashboard/slots/table";
import { Table as TableSlotType, Toolbar } from "@/types/slots/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

import { getAllPosts, getPostsTotal } from "@/models/posts";
import { checkIsAdminAndLogin } from "@/lib/common";
import { redirect } from "next/navigation";

// 强制动态渲染，因为使用了 checkIsAdminAndLogin (getServerSession)
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 10;

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const isAdmin = await checkIsAdminAndLogin();
  if (!isAdmin) return redirect("/auth/signin");

  const { page: pageParam } = await searchParams;
  const currentPage = parseInt(pageParam || "1");

  // 获取文章数据和总数
  const [posts, totalPosts] = await Promise.all([
    getAllPosts(currentPage, PAGE_SIZE),
    getPostsTotal(),
  ]);

  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);
  const columns: TableColumn[] = [
    { name: "title", title: "Title" },
    { name: "description", title: "Description" },
    { name: "slug", title: "Slug" },
    { name: "locale", title: "Locale" },
    {
      name: "status",
      title: "Status",
      callback: (row) => (
        <Badge variant={row.status === "published" ? "default" : "secondary"}>
          {row.status}
        </Badge>
      ),
    },
    {
      name: "created_at",
      title: "Created At",
      callback: (row) => formatDate(row.created_at),
    },
  ];

  const toolbar: Toolbar = {
    items: [
      {
        title: "Add Post",
        icon: "RiAddLine",
        url: "/admin/posts/add",
        // variant: "outline",
      },
      {
        title: "AI Add Posts",
        icon: "RiFileUploadLine",
        url: "/admin/posts/ai-add",
        // variant: "outline",
      },
    ],
  };

  const table: TableSlotType = {
    title: "文章管理",
    description: `共 ${totalPosts} 篇文章，当前第 ${currentPage} 页，每页显示 ${PAGE_SIZE} 篇`,
    columns,
    data: posts || [],
    empty_message: "暂无文章数据",
    toolbar,
    isEdit: true,
    editUrl: "/admin/posts/[id]",
    pagination: {
      currentPage,
      totalPages,
      showPagination: true,
    },
  };

  return <TableSlot {...table} />;
}
