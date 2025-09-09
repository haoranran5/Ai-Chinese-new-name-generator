"use client";

import { useState } from "react";
import { toast } from "sonner";

interface ApiKeyClickToCopyProps {
  fullApiKey: string;
  maskedApiKey: string;
}

export function ApiKeyClickToCopy({ fullApiKey, maskedApiKey }: ApiKeyClickToCopyProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    try {
      // 直接复制完整的API Key到剪贴板
      await navigator.clipboard.writeText(fullApiKey);
      toast.success("Copied");
    } catch (error) {
      console.error("复制API Key失败:", error);
      toast.error("Failed to copy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <code
      className="bg-muted px-2 py-1 rounded text-sm font-mono cursor-pointer hover:bg-muted/80 transition-colors"
      onClick={handleClick}
      title="Click to copy full API Key"
    >
      {loading ? "Copying..." : maskedApiKey}
    </code>
  );
}
