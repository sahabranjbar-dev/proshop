import ListHeader from "@/components/ListHeader/ListHeader";
import { authOptions } from "@/lib/authOptions";
import { SquareArrowOutUpLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Activity } from "react";
import ProductsFilter from "./ProductsFilter";
import prisma from "@/utils/prisma";

const ProductsHeader = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.userId;
  const draft = await prisma.productDraft.findFirst({
    where: {
      userId,
    },
  });

  const hasDraft = draft?.status === "DRAFT";

  const showResumeFormButton = !!userId && !!hasDraft;

  return (
    <div className="flex justify-between items-center">
      <ListHeader
        filter={<ProductsFilter />}
        formPath="/admin/products/new-product"
      />

      <Activity mode={showResumeFormButton ? "visible" : "hidden"}>
        <Link
          href={
            "/admin/products/new-product" + `?step=${(draft?.step ?? -1) + 1}`
          }
          target="_blank"
          className="px-4 py-2 m-2 rounded-2xl flex justify-center items-center gap-2 bg-primary-100 hover:shadow duration-300"
        >
          <p className="font-semibold">ادامه آخرین فرم</p>
          <SquareArrowOutUpLeft />
        </Link>
      </Activity>
    </div>
  );
};

export default ProductsHeader;
