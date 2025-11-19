export interface ITable<T = any> {
  columns: ITableColumns[];
  data?: T;
  loading?: boolean;
  error?: any;
  fetch?: () => void;
}

export interface ITableColumns<T = any> {
  field: string;
  title: string;
  width?: string;
  hasDateFormatter?: boolean;
  render?: (value: any, item: T, rowMeta: { index: number }) => React.ReactNode;
}
