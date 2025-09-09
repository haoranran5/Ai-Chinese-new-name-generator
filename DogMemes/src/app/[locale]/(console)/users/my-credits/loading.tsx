import { TableSkeleton } from "@/components/skeletons/table-skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <TableSkeleton />
    </div>
  );
}
