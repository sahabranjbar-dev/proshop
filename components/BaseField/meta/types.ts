export interface IBaseField extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  label?: string;
  required?: boolean;
  validate?: (value: any) => string | boolean;
  disabled?: boolean | string;
  loading?: boolean;
}
