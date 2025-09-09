"use client";

import dynamic from "next/dynamic";
import { TrendData } from "@/types/admin/dashboard";

const Charts = dynamic(() => import("./Charts"), { ssr: false });

interface ClientChartsProps {
  userTrend: TrendData[];
  orderTrend: TrendData[];
}

export default function ClientCharts({
  userTrend,
  orderTrend,
}: ClientChartsProps) {
  return <Charts userTrend={userTrend} orderTrend={orderTrend} />;
}
