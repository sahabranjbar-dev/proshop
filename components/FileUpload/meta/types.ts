import { Dispatch, SetStateAction } from "react";

export interface IFileUpload {
  maxSize?: number;
  multiple?: boolean;
  onChange?: (...args: any) => void;
  value?: any;
  accept?: string;
  onUploaded?: (publicUrl: string, fileId: string, key: string) => void;
  savedFolderName?: string;
  setImages?: Dispatch<SetStateAction<any>>;
}
