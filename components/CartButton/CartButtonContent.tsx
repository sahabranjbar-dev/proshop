import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartButtonContent = ({ cartItemCount }: { cartItemCount: number }) => {
  return (
    <Link
      href="/cart"
      className="text-gray-600 hover:text-secondary relative p-2 rounded-full hover:bg-gray-100 transition duration-150"
    >
      <ShoppingCart size={20} className="text-secondary" />
      {/* نشان تعداد آیتم‌ها */}
      <span className="h-5 w-5 absolute top-0 right-0 inline-flex items-center justify-center text-xs font-bold leading-none transform translate-x-1/2 -translate-y-1/2 bg-secondary rounded-full">
        {cartItemCount}
      </span>
    </Link>
  );
};

export default CartButtonContent;
