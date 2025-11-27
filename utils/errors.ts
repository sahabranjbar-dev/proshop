"use server";

import { authOptions } from "@/lib/authOptions";
import { Role } from "@/lib/generated/prisma/enums";
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
