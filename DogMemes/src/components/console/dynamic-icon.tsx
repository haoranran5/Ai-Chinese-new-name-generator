// src/components/console/dynamic-icon.tsx
"use client";

import {
  RiOrderPlayLine,
  RiUserLine,
  RiSettings4Line,
  RiDashboardLine,
  RiFileList3Line,
  RiWalletLine,
  RiTeamLine,
  RiQuestionLine,
  RiKeyLine,
} from "react-icons/ri";

// 图标映射
const iconMap: Record<string, React.ElementType> = {
  RiOrderPlayLine,
  RiUserLine,
  RiSettings4Line,
  RiDashboardLine,
  RiFileList3Line,
  RiWalletLine,
  RiTeamLine,
  RiQuestionLine,
  RiKeyLine,
  // 可以根据需要添加更多图标
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

export default function DynamicIcon({
  name,
  className = "",
}: DynamicIconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return <IconComponent className={className} />;
}
