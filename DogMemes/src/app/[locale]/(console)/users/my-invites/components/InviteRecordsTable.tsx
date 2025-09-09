"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AffiliateStatus } from "@/types/db/affiliate-record";
import { formatDate } from "@/lib/time";
import { useTranslations } from "next-intl";
import { affiliates } from "@/db/schema";

// 扩展的邀请记录类型，包含合并后的用户信息
type ExtendedInviteRecord = typeof affiliates.$inferSelect & {
  user_email?: string;
  inviter_nickname?: string;
  inviter_avatar?: string | null;
};

interface InviteRecordsTableProps {
  records: ExtendedInviteRecord[] | null;
  isLoading: boolean;
}

const PAGE_SIZE = 10;

export function InviteRecordsTable({
  records,
  isLoading,
}: InviteRecordsTableProps) {
  const t = useTranslations();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((records?.length || 0) / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentRecords = records?.slice(startIndex, endIndex);

  return (
    <Card>
      <CardHeader className="pb-3">
        <h2 className="text-xl font-semibold">{t("my_invites.invite_records")}</h2>
      </CardHeader>
      <CardContent>
        {records?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {t("my_invites.no_invite_records")}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    
                    <TableHead>{t("my_invites.table.user")}</TableHead>
                    <TableHead>{t("my_invites.table.status")}</TableHead>
                    {/* <TableHead>{t("my_invites.table.order_no")}</TableHead> */}
                    <TableHead className="text-right">{t("my_invites.table.paid_amount")}</TableHead>
                    <TableHead className="text-right">{t("my_invites.table.reward_amount")}</TableHead>
                    <TableHead>{t("my_invites.table.created_at")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRecords?.map((record) => (
                    <TableRow key={record.id}>
                      
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {record.inviter_avatar ? (
                            <img
                              src={record.inviter_avatar || "/imgs/head/default.png"}
                              alt={record.inviter_nickname || "User"}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                          <span className="text-base">
                            {record.inviter_nickname || t("my_invites.table.unknown_user")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === AffiliateStatus.Completed
                              ? "default"
                              : "secondary"
                          }
                        >
                          {record.status === AffiliateStatus.Completed
                            ? t("my_invites.table.completed")
                            : t("my_invites.table.pending")}
                        </Badge>
                      </TableCell>
                      {/* <TableCell>
                        {record.paid_order_no ? (
                          <div className="font-mono text-xs">
                            {record.paid_order_no}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell> */}
                      <TableCell className="text-right">
                        {(record.paid_amount || 0) > 0 ? (
                          <span className="font-medium">${((record.paid_amount || 0) / 100).toFixed(2)}</span>
                        ) : (
                          <span className="text-muted-foreground">$0.00</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {(record.reward_amount || 0) > 0 ? (
                          <span className="font-medium ">${((record.reward_amount || 0) / 100).toFixed(2)}</span>
                        ) : (
                          <span className="text-medium text-muted-foreground">$0.00</span>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(record.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1 || isLoading}
                >
                  {t("my_invites.table.prev_page")}
                </Button>
                <div className="flex items-center px-4">
                  {currentPage} / {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages || isLoading}
                >
                  {t("my_invites.table.next_page")}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
