import { getUserApiKeys } from "@/models/apikey";
import { serverGetUserUuid } from "@/lib/common";
import { TableColumn } from "@/types/blocks/table";
import TableSlot from "@/components/console/slots/table";
import { Table as TableSlotType } from "@/types/slots/table";
import { getTranslations } from "next-intl/server";
import moment from "moment";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { ApiKeyClickToCopy } from "./components/ApiKeyClickToCopy";
import { Edit, Trash2 } from "lucide-react";

interface ApiKeyRecord {
  id: number;
  apikey: string;
  user_uuid: string;
  name: string | null;
  created_at: string | null;
  status: string;
  fullApiKey?: string; // 添加完整API Key字段
}

export default async function MyApiKeysPage() {
  const t = await getTranslations();

  const user_uuid = await serverGetUserUuid();

  const callbackUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/my-apikeys`;
  if (!user_uuid) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  // 获取用户 API Keys 数据
  const apiKeys = await getUserApiKeys(user_uuid);

  // 保留完整API Key，同时创建掩码版本用于显示
  const maskedApiKeys = apiKeys.map(key => ({
    ...key,
    fullApiKey: key.apikey, // 保存完整的API Key
    apikey: `${key.apikey.substring(0, 8)}...${key.apikey.substring(key.apikey.length - 4)}` // 掩码版本
  }));

  const columns: TableColumn[] = [
    {
      name: "name",
      title: t("my_apikeys.table.name", { default: "名称" }),
      callback: (item: ApiKeyRecord) => item.name || "未命名"
    },
    {
      name: "apikey",
      title: t("my_apikeys.table.api_key", { default: "API Key" }),
      callback: (item: ApiKeyRecord) => (
        <ApiKeyClickToCopy
          fullApiKey={item.fullApiKey || ""}
          maskedApiKey={item.apikey}
        />
      )
    },
    {
      name: "status",
      title: t("my_apikeys.table.status", { default: "状态" }),
      callback: (item: ApiKeyRecord) => {
        const isActive = item.status === "active";
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isActive
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          }`}>
            {isActive ? t("my_apikeys.status.active", { default: "启用" }) : t("my_apikeys.status.inactive", { default: "禁用" })}
          </span>
        );
      },
    },
    {
      name: "created_at",
      title: t("my_apikeys.table.created_at", { default: "创建时间" }),
      callback: (item: ApiKeyRecord) =>
        moment(item.created_at || "").format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      name: "action",
      title: t("my_apikeys.table.actions", { default: "操作" }),
      callback: (item: ApiKeyRecord) => (
        <div className="flex items-center gap-1">
          <a
            href={`/users/my-apikeys/${item.id}/edit`}
            className="inline-flex items-center justify-center w-8 h-8 text-gray-600 rounded hover:text-blue-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-colors"
            title={t("my_apikeys.edit", { default: "编辑" })}
          >
            <Edit className="w-4 h-4" />
          </a>
          <a
            href={`/users/my-apikeys/${item.id}/delete`}
            className="inline-flex items-center justify-center w-8 h-8 text-gray-600 rounded hover:text-red-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-800 transition-colors"
            title={t("my_apikeys.delete", { default: "删除" })}
          >
            <Trash2 className="w-4 h-4" />
          </a>
        </div>
      )
    }
  ];

  const table: TableSlotType = {
    title: t("my_apikeys.title", { default: "我的 API Keys" }),
    description: t("my_apikeys.description", {
      default: `管理您的 API Keys，当前共有 ${apiKeys.length} 个`
    }),
    toolbar: {
      items: [
        {
          title: t("my_apikeys.create", { default: "创建 API Key" }),
          icon: "RiAddLine",
          url: "/users/my-apikeys/create",
          variant: "default",
        }
      ],
    },
    columns: columns,
    data: maskedApiKeys || null,
    empty_message: t("my_apikeys.no_apikeys", { default: "暂无 API Keys" }),
  };

  return (
    <Suspense fallback={<TableSkeleton columns={4} />}>
      <div>
        <TableSlot {...table} />
      </div>
    </Suspense>
  );
}
