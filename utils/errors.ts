"use server";

import { NextResponse } from "next/server";

export const ServerError = async () => {
  return NextResponse.json(
    { message: "خطایی در سرور رخ داد. لطفا دوباره تلاش کنید." },
    { status: 500 }
  );
};
