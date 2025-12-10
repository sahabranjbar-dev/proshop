import prisma from "@/utils/prisma";
import ProductCard from "../ProductCard/ProductCard";
import { Card } from "../ui/card";

const Festival = async () => {
  const campaigns = await prisma.saleCampaign.findMany({
    where: {
      isActive: true,
    },
    include: {
      products: true,
    },
  });
  const products = campaigns.find(
    (item) => item.startDate > new Date()
  )?.products;

  if (!products?.length) return null;

  return (
    <section>
      <Card className="p-4">
        <div>
          <h2>جشنواره‌ی فروش</h2>
        </div>
        <div>
          {products.map((item: any) => (
            <ProductCard
              key={item?.id}
              productId=""
              productPrice={2143434}
              productTitle=""
            />
          ))}
        </div>
      </Card>
    </section>
  );
};

export default Festival;
