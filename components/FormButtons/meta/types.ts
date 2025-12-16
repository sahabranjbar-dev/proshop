export interface IFormButtons {
  id?: string;
  submitLoading?: boolean;
  cancelUrl?: string;
  submitLabel?: string;
  onCancel?: () => void;
  className?: string;
}
