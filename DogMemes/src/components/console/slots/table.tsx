import { Table as TableType } from "@/types/slots/table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RiBookLine, RiDiscordFill, RiWalletLine, RiAddLine, RiToggleLine, RiDeleteBinLine } from "react-icons/ri";
import { IconType } from "react-icons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function TableSlot({
  title,
  description,
  toolbar,
  columns,
  data,
  empty_message,
  pagination,
}: TableType) {
  // 图标映射
  const IconMap: Record<string, IconType> = {
    RiBookLine: RiBookLine,
    RiDiscordFill: RiDiscordFill,
    RiWalletLine: RiWalletLine,
    RiAddLine: RiAddLine,
    RiToggleLine: RiToggleLine,
    RiDeleteBinLine: RiDeleteBinLine,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1.5 text-sm">
              {description}
            </p>
          )}
        </div>
        {toolbar && toolbar.items.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0 w-full md:w-auto">
            {toolbar.items.map((item, index) => {
              const Icon = item.icon ? IconMap[item.icon] : null;
              return (
                <Button
                  key={index}
                  variant={item.variant || "default"}
                  onClick={item.onClick}
                  asChild={!!item.url}
                  size="sm"
                  className="transition-all flex-grow md:flex-grow-0"
                >
                  {item.url ? (
                    <a
                      href={item.url}
                      target={item.target || "_self"}
                      className="flex items-center justify-center w-full"
                    >
                      {Icon && <Icon className="h-3.5 w-3.5 mr-1.5" />}
                      {item.title}
                    </a>
                  ) : (
                    <>
                      {Icon && <Icon className="h-3.5 w-3.5 mr-1.5" />}
                      {item.title}
                    </>
                  )}
                </Button>
              );
            })}
          </div>
        )}
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.name} className="whitespace-nowrap">
                    {column.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data === undefined ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-4"
                  >
                    No data
                  </TableCell>
                </TableRow>
              ) : data && data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-4"
                  >
                    {empty_message || "No data"}
                  </TableCell>
                </TableRow>
              ) : (
                data &&
                data.map((item, index) => (
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.name}
                        className={
                          column.name === "description"
                            ? "max-w-xs truncate"
                            : undefined
                        }
                      >
                        {column.callback
                          ? column.callback(item)
                          : item[column.name] || "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 分页组件 */}
      {pagination && pagination.showPagination !== false && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              {/* 上一页 */}
              {pagination.currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`?page=${pagination.currentPage - 1}`}
                  />
                </PaginationItem>
              )}

              {/* 页码 */}
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => {
                // 显示逻辑：当前页前后各2页
                if (
                  pageNum === 1 ||
                  pageNum === pagination.totalPages ||
                  (pageNum >= pagination.currentPage - 2 && pageNum <= pagination.currentPage + 2)
                ) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href={`?page=${pageNum}`}
                        isActive={pageNum === pagination.currentPage}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  pageNum === pagination.currentPage - 3 ||
                  pageNum === pagination.currentPage + 3
                ) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              {/* 下一页 */}
              {pagination.currentPage < pagination.totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href={`?page=${pagination.currentPage + 1}`}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
