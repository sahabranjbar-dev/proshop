export interface IBaseField
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  validate?: (value: any) => string | boolean;
  loading?: boolean;
  component: any;
}
