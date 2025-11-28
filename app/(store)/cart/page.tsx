import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import CartPageContent from "./components/CartPageContent";
import CartPageContentLogin from "./components/CartPageContentLogin";

const CartPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen">
      {session?.user?.id ? <CartPageContentLogin /> : <CartPageContent />}
    </div>
  );
};

export default CartPage;
