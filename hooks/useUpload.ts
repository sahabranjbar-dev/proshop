// hooks/useUpload.ts
import axios from "axios";
import { useState } from "react";

export function useUpload() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file: File, folder?: string) => {
    setProgress(0);
    setLoading(true);
    try {
      // 1) درخواست signed URL از سرور
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || "application/octet-stream",
          folder,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "could not get signed url");

      const { signedUrl, publicUrl, key, fileId } = json;

      // 2) PUT مستقیم به signedUrl با axios (تا onUploadProgress بگیریم)
      await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
        onUploadProgress: (p) => {
          if (p.total) {
            setProgress(Math.round((p.loaded * 100) / p.total));
          }
        },
      });

      setLoading(false);
      setProgress(100);
      return { publicUrl, key, fileId };
    } catch (err) {
      setLoading(false);
      setProgress(0);
      throw err;
    }
  };

  return { uploadFile, progress, loading, setProgress };
}
