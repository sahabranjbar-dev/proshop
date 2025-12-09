export interface IBaseField {
  name: string;
  label?: string;
  required?: boolean;
  validate?: (value: any) => string | boolean;
  loading?: boolean;
  component: any;
  formatter?: boolean;
  onUploaded?: (publicUrl: string, fileId: string) => void;
  containerClassName?: string;
  [key: string]: any;
}
