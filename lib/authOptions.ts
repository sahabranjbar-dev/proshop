import { convertToEnglishDigits } from "@/utils/common";
import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { AuthOptions, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "OTP",
      credentials: {
        phone: { label: "شماره موبایل", type: "text" },
        code: { label: "کد یکبار مصرف", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.phone || !credentials.code) {
          throw new Error("شماره موبایل یا کد وارد نشده است.");
        }

        const phone = convertToEnglishDigits(credentials.phone);
        const code = convertToEnglishDigits(credentials.code);

        const otpEntry = await prisma.otpCode.findUnique({ where: { phone } });
        if (!otpEntry) throw new Error("کد یافت نشد.");

        const isValid = await bcrypt.compare(code, otpEntry.code);
        if (!isValid) throw new Error("کد وارد شده صحیح نیست.");

        const now = new Date();
        if ((now.getTime() - otpEntry.createdAt.getTime()) / 1000 > 300) {
          await prisma.otpCode.delete({ where: { phone } });
          throw new Error("کد منقضی شده است.");
        }

        await prisma.otpCode.delete({ where: { phone } });

        const user = await prisma.user.upsert({
          where: { phone },
          update: {},
          create: { phone },
        });

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
