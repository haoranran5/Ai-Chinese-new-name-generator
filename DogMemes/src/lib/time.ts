/**
 * 获取ISO格式的当前时间字符串
 * @returns ISO格式的时间字符串
 */
export function getIsoTimestr(): string {
  return new Date().toISOString();
}

/**
 * 格式化日期为友好显示格式
 * @param dateStr 日期字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
