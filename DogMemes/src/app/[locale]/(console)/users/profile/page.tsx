"use client";

import { useState, useEffect, Suspense } from "react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton";
import {useTranslations } from "next-intl";

// 定义表单验证模式
const profileFormSchema = z.object({
  nickname: z.string().min(2, {
    message: "用户名至少需要2个字符",
  }),
  email: z.string().email({
    message: "请输入有效的邮箱地址",
  }),
});

function ProfileContent() {
  const t = useTranslations();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const session = useSession();
  const callbackUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/my-orders`;
  if (!session.data?.user?.uuid) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  // 初始化表单
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      nickname: "",
      email: "",
    },
  });

  // 加载用户数据
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setIsDataLoading(true);
        const response = await fetch("/api/user/profile");
        if (!response.ok) {
          throw new Error("Loading failed");
        }
        const data = await response.json();

        // 更新表单数据
        form.reset({
          nickname: data.nickname || "",
          email: data.email || "",
        });
      } catch (error) {
        toast.error("Loading failed", {
          description: "Failed to load profile, please refresh and try again",
        });

        console.error("Loading user profile failed", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    loadUserProfile();
  }, [form]);

  // 处理表单提交
  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    try {
      setIsLoading(true);

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Updating failed");
      }

      toast.success("Updating succeeded", {
        description: "Your profile has been updated successfully",
      });

      router.refresh();
    } catch (error) {
      toast.error("Updating failed", {
        description: "An error occurred while updating your profile, please try again later",
      });

      console.error("Updating user profile failed", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isDataLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>{t("my_profile.title")}</CardTitle>
          <CardDescription>
            {t("my_profile.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("my_profile.nickname")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("my_profile.nickname_placeholder")} {...field} />
                    </FormControl>
                    <FormDescription>{t("my_profile.nickname_description")}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>邮箱</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormDescription>您的主要联系邮箱</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("my_profile.saving")}
                  </>
                ) : (
                  t("my_profile.save_changes")
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}
