export interface ICombobox<T = any, D = any> {
  data?: T;
  disabled?: boolean;
  error?: D;
  refetch?: () => void;
  onChange?: (value: any) => void;
  value?: any;
  selectLabel?: string;
  placeholder?: string;
  className?: string;
  label?: string;
  loading?: boolean;
  keyField?: string;
  getLabel?: (data: any) => any;
  getKey?: (data: any) => any;
  selectValue?: any;
  options?: { farsiTitle: string; englishTitle: string; id: string }[];
}
