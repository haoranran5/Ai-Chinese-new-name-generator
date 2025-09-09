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
import { RiBookLine, RiDiscordFill } from "react-icons/ri";
import { IconType } from "react-icons";
import { EditButton } from "./edit-button";
import Link from "next/link";
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
  isEdit,
  onRowClick,
  editUrl,
  idField = "id",
  pagination,
}: TableType) {
  // 图标映射
  const IconMap: Record<string, IconType> = {
    RiBookLine: RiBookLine,
    RiDiscordFill: RiDiscordFill,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-semibold dark:text-white">{title}</h1>
          {description && (
            <p className="text-muted-foreground dark:text-gray-400 mt-1.5 text-sm">
              {description}
            </p>
          )}
        </div>
        {toolbar && toolbar.items.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {toolbar.items.map((item, index) => {
              const Icon = item.icon ? IconMap[item.icon] : null;
              const ButtonContent = (
                <>
                  {Icon && <Icon className="h-3.5 w-3.5 mr-1.5" />}
                  {item.title}
                </>
              );

              return (
                <Button
                  key={index}
                  variant={item.variant || "default"}
                  size="sm"
                  className="transition-all"
                  asChild
                >
                  {item.url ? (
                    <Link href={item.url} className="flex items-center">
                      {ButtonContent}
                    </Link>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="flex items-center"
                    >
                      {ButtonContent}
                    </button>
                  )}
                </Button>
              );
            })}
          </div>
        )}
      </div>
      <div className="border dark:border-gray-800 rounded-lg">
        <Table>
          <TableHeader className="dark:bg-gray-900">
            <TableRow className="dark:border-gray-800">
              {columns.map((column) => (
                <TableHead key={column.name} className="dark:text-gray-300">
                  {column.title}
                </TableHead>
              ))}
              {isEdit && (
                <TableHead className="w-20 dark:text-gray-300">操作</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="dark:bg-black">
            {data === undefined ? (
              <TableRow className="dark:border-gray-800">
                <TableCell
                  colSpan={isEdit ? columns.length + 1 : columns.length}
                  className="text-center py-4 dark:text-gray-400"
                >
                  No data
                </TableCell>
              </TableRow>
            ) : data && data.length === 0 ? (
              <TableRow className="dark:border-gray-800">
                <TableCell
                  colSpan={isEdit ? columns.length + 1 : columns.length}
                  className="text-center py-4 dark:text-gray-400"
                >
                  {empty_message || "No data"}
                </TableCell>
              </TableRow>
            ) : (
              data &&
              data.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-muted/50 dark:hover:bg-gray-900 dark:border-gray-800"
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.name}
                      className={
                        column.name === "description"
                          ? "max-w-xs truncate dark:text-gray-300"
                          : "dark:text-gray-300"
                      }
                    >
                      {column.callback
                        ? column.callback(item)
                        : item[column.name] || "-"}
                    </TableCell>
                  ))}
                  {isEdit && (
                    <TableCell className="text-right dark:text-gray-300">
                      <EditButton
                        row={item}
                        onEdit={onRowClick}
                        editUrl={editUrl}
                        idField={idField}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
