import api from "@/lib/axios";

export async function getCart(): Promise<any> {
  const result = await api("/cart");
  return result.data || [];
}
