import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface StatsCardProps {
  stats: {
    totalInviteCount: number;
    totalPaidCount: number;
    totalRewardAmount: number;
  };
}

export function StatsCard({ stats }: StatsCardProps) {
  const t = useTranslations();

  return (
    <Card>
      <CardHeader className="pb-3">
        <h2 className="text-xl font-semibold">{t("my_invites.invite_reward")}</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{stats.totalInviteCount}</div>
            <div className="text-sm text-muted-foreground">{t("my_invites.total_invites")}</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{stats.totalPaidCount}</div>
            <div className="text-sm text-muted-foreground">{t("my_invites.paid")}</div>
          </div>
          <div>
            <div className="text-3xl font-bold">${(stats.totalRewardAmount / 100).toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">{t("my_invites.total_reward")}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
