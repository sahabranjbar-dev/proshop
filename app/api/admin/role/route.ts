import { authOptions } from "@/lib/authOptions";
import { Role } from "@/lib/generated/prisma/enums";
import { ServerError } from "@/utils/errors";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    const isAdmin = session?.user.role === Role.ADMIN;

    if (!isAdmin) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const roleMap: Record<Role, { englishTitle: string; farsiTitle: string }> =
      {
        [Role.ADMIN]: { englishTitle: "ADMIN", farsiTitle: "مدیر" },
        [Role.USER]: { englishTitle: "USER", farsiTitle: "کاربر" },
      };

    const resultList = Object.values(Role).map((role) => ({
      englishTitle: roleMap[role].englishTitle,
      farsiTitle: roleMap[role].farsiTitle,
    }));

    return NextResponse.json(
      {
        resultList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return ServerError();
  }
}
