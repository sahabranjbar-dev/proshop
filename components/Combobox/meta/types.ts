export interface ICombobox<T = any, D = any> {
  data?: T;
  disabled?: boolean;
  error?: D;
  refetch?: () => void;
  onChange?: (value: any) => void;
  value?: any;
}
