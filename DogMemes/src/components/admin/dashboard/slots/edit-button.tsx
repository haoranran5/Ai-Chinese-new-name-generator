"use client";

import { Button } from "@/components/ui/button";
import { RiEditLine } from "react-icons/ri";
import Link from "next/link";

interface EditButtonProps {
  row: any;
  onEdit?: (row: any) => void;
  editUrl?: string;
  idField?: string;
}

export function EditButton({
  row,
  onEdit,
  editUrl,
  idField = "id",
}: EditButtonProps) {
  // 如果提供了editUrl，优先使用URL跳转
  if (editUrl) {
    // 构建完整的URL，如果URL中包含 [id] 则替换为实际的ID
    const href = editUrl.includes("[id]")
      ? editUrl.replace("[id]", row[idField] || "")
      : `${editUrl}${row[idField] || ""}`;

    return (
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
        <Link href={href}>
          <RiEditLine className="h-4 w-4" />
          <span className="sr-only">编辑</span>
        </Link>
      </Button>
    );
  }

  // 否则使用onClick事件
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        onEdit?.(row);
      }}
      className="h-8 w-8 p-0"
    >
      <RiEditLine className="h-4 w-4" />
      <span className="sr-only">编辑</span>
    </Button>
  );
}
