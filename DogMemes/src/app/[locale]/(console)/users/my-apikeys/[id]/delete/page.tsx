import { findApiKeyById } from "@/models/apikey";
import { serverGetUserUuid } from "@/lib/common";
import { getTranslations } from "next-intl/server";
import { redirect, notFound } from "next/navigation";
import { Suspense } from "react";
import { DeleteApiKeyForm } from "./components/DeleteApiKeyForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DeleteApiKeyPage({ params }: PageProps) {
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

      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <CardTitle className="text-red-600">
              {t("my_apikeys.delete_title", { default: "删除 API Key" })}
            </CardTitle>
          </div>
          <CardDescription>
            {t("my_apikeys.delete_description", { default: "此操作无法撤销，请确认是否要删除此 API Key" })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <DeleteApiKeyForm apiKey={apiKey} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
