import { findApiKeyById } from "@/models/apikey";
import { serverGetUserUuid } from "@/lib/common";
import { getTranslations } from "next-intl/server";
import { redirect, notFound } from "next/navigation";
import { Suspense } from "react";
import { EditApiKeyForm } from "./components/EditApiKeyForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditApiKeyPage({ params }: PageProps) {
  const { id } = await params;
  const t = await getTranslations();

  const user_uuid = await serverGetUserUuid();
  const callbackUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/my-apikeys`;
  if (!user_uuid) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const apiKeyId = parseInt(id);
  if (isNaN(apiKeyId)) {
    notFound();
  }

  // 获取API Key信息
  const apiKey = await findApiKeyById(apiKeyId);
  
  if (!apiKey) {
    notFound();
  }

  // 验证API Key属于当前用户
  if (apiKey.user_uuid !== user_uuid) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <div className="mb-6">
        <Link 
          href="/users/my-apikeys" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("my_apikeys.back_to_list", { default: "返回 API Keys" })}
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("my_apikeys.edit_title", { default: "编辑 API Key" })}</CardTitle>
          <CardDescription>
            {t("my_apikeys.edit_description", { default: "修改 API Key 的名称和状态" })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <EditApiKeyForm apiKey={apiKey} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
