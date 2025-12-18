"use server";

import { authOptions } from "@/lib/authOptions";
import { Role } from "@/types/common";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const ServerError = async () => {
  return NextResponse.json(
    { message: "خطایی در سرور رخ داد. لطفا دوباره تلاش کنید." },
    { status: 500 }
  );
};

export const isRequestByAdmin = async (): Promise<boolean> => {
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user?.role === Role.ADMIN;

  return isAdmin;
};

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      error: true,
      res: NextResponse.json({ error: "نیاز به ورود دارید" }, { status: 401 }),
    };
  }
  return { error: false, session };
}
