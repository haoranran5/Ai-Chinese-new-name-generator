import { ReactNode } from "react";
import { Sidebar } from "@/types/siderbar";
import ConsoleLayout from "@/components/console/layout";
import { getTranslations } from "next-intl/server";
import { serverGetUserInfo } from "@/services/user";
import { redirect } from "@/i18n/navigation";

export default async function UserLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const userInfo = await serverGetUserInfo();
  if (!userInfo || !userInfo.email) {
    redirect({ href: "/auth/signin", locale: locale });
  }
  const t = await getTranslations();

  const sidebar: Sidebar = {
    nav: {
      items: [
        {
          title: t("user.my_orders"),
          url: "/users/my-orders",
          icon: "RiOrderPlayLine",
        },
        {
          title: t("user.my_invites"),
          url: "/users/my-invites",
          icon: "RiTeamLine",
        },
        {
          title: t("user.my_credits"),
          url: "/users/my-credits",
          icon: "RiWalletLine",
        },
        {
          title: t("user.my_apikeys"),
          url: "/users/my-apikeys",
          icon: "RiKeyLine",
        },
      ],
    },
  };

  return <ConsoleLayout sidebar={sidebar}>{children}</ConsoleLayout>;
}
