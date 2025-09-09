import DashboardLayout from "@/components/admin/dashboard/layout";
import { ReactNode, Suspense } from "react";
import type { Sidebar as SidebarType } from "@/types/blocks/sidebar";
import { serverGetUserInfo } from "@/lib/common";
import { redirect } from "next/navigation";
import { navigationConfig } from "@/types/navigation";
import { AdminSkeleton } from "@/components/skeletons/admin-skeleton";

// 强制动态渲染，因为使用了 serverGetUserInfo (getServerSession)
export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userInfo = await serverGetUserInfo();
  if (!userInfo?.uuid || !userInfo?.email) {
    redirect("/auth/signin");
  }

  const adminEmails = process.env.ADMIN_EMAILS?.split(",");
  if (!adminEmails?.includes(userInfo.email)) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        No access
      </div>
    );
  }

  const sidebarConfig: SidebarType = {
    brand: navigationConfig.brand,
    nav: {
      items: navigationConfig.admin.mainNav,
    },
    social: {
      items: navigationConfig.admin.socialNav,
    },
  };

  return (
    <DashboardLayout sidebar={sidebarConfig}>
      <Suspense fallback={<AdminSkeleton />}>{children}</Suspense>
    </DashboardLayout>
  );
}
