import { TableColumn } from "../blocks/table";

export interface ToolbarItem {
  title: string;
  icon?: string;
  url?: string;
  target?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  onClick?: () => void;
}

export interface Toolbar {
  items: ToolbarItem[];
}

export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  showPagination?: boolean;
}

export interface Table {
  title: string;
  description?: string;
  toolbar?: Toolbar;
  columns: TableColumn[];
  data: any[] | null;
  empty_message?: string;
  onRowClick?: (row: any) => void;
  loading?: boolean;
  error?: string;
  isEdit?: boolean;
  editUrl?: string;
  idField?: string;
  actionRender?: (row: any) => React.ReactNode;
  pagination?: PaginationConfig;
}
