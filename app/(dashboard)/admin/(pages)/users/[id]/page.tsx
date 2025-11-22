import { authOptions } from "@/lib/authOptions";
import { Role } from "@/types/common";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import UserForm from "./components/UserForm";

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== Role.ADMIN) {
    return "شما دسترسی به این صفحه ندارید";
  }

  const resolvedParams = await params;

  const { id } = resolvedParams;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return (
    <UserForm
      email={user?.email}
      firstName={user?.firstName}
      lastName={user?.lastName}
      id={user?.id}
      phone={user?.phone ?? ""}
      role={user?.role}
      key={user?.id}
    />
  );
};

export default UserPage;
