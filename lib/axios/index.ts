// src/lib/axios/index.ts
import { createApiClient } from "./client";

export const api = createApiClient(process.env.NEXT_PUBLIC_API_URL + "/api");
export const authApi = createApiClient(
  process.env.NEXT_PUBLIC_API_URL + "/api/auth"
);
export default api;
