export interface TableColumn {
  name: string;
  title: string;
  callback?: (item: any) => string | number | React.ReactNode;
}

export interface TableProps {
  title: string;
  columns: TableColumn[];
  data: any[];
}
