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

const LoginButton = () => {
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
            <User size={20} />
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
            <DropdownMenuItem>
              <Link
                href={
                  session.data.user?.role === "ADMIN" ? "/admin" : "customer"
                }
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
          <Button
            type="button"
            onClick={loginClickHanlder}
            variant={"ghost"}
            className="border border-primary/50 text-primary"
          >
            ورود / ثبت‌نام
          </Button>

          <Modal
            title="ورود به حساب کاربری"
            onClose={() => setOpenModal(false)}
            open={openModal}
            hideActions
          >
            <LoginForm />
          </Modal>
        </>
      )}
    </>
  );
};

export default LoginButton;
