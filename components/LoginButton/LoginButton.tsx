"use client";
import LoginForm from "@/app/auth/components/LoginForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Button } from "../ui/button";
import Link from "next/link";
import clsx from "clsx";

interface Props {
  className?: string;
  isModal?: boolean;
}

const LoginButton = ({ className, isModal = true }: Props) => {
  const session = useSession();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const isAuthenticated = session.status === "authenticated";

  const loginClickHanlder = () => {
    setOpenModal(true);
  };

  const queryClient = useQueryClient();

  const userId = session.data?.user?.id;

  return (
    <>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User className="text-primary mt-2" size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {session.data.user?.phone ||
                session.data.user?.name ||
                session.data.user?.email ||
                // check if admin or not
                "کاربر میهمان"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem dir="rtl">
              <Link
                href={
                  session.data.user?.role === "ADMIN" ? "/admin" : "customer"
                }
                target="_blank"
              >
                پروفایل کاربری
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => {
                signOut();
              }}
            >
              خروج از حساب کاربری
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          {isModal ? (
            <>
              <Button
                type="button"
                onClick={loginClickHanlder}
                variant={"ghost"}
                className={clsx(
                  "border border-primary/50 text-primary",
                  className
                )}
              >
                ورود / ثبت‌نام
              </Button>

              <Modal
                title="ورود به حساب کاربری"
                onOpenChange={setOpenModal}
                open={openModal}
                hideActions
              >
                <LoginForm />
              </Modal>
            </>
          ) : (
            <Link
              className={clsx(
                "border border-primary/50 text-primary text-center p-2 rounded-lg",
                className
              )}
              href={"/auth"}
            >
              {" "}
              ورود / ثبت‌نام
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default LoginButton;
