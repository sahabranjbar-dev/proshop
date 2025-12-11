import Advantages from "@/components/Advantages/Advantages";
import Banners from "@/components/Banners/Banners";
import Bestsellers from "@/components/Bestsellers/Bestsellers";
import BrandsLogo from "@/components/BrandsLogo/BrandsLogo";
import Festival from "@/components/Festival/Festival";
import Hero from "@/components/Hero/Hero";
import { Card } from "@/components/ui/card";

export default async function Home() {
  return (
    <div className="container mx-auto m-2">
      <section>
        <Card className="p-4 my-2">
          <Hero />
        </Card>
      </section>

      <section className="p-4 my-2">
        <Festival />
      </section>

      <section>
        <Card className="p-4 my-2">
          <BrandsLogo />
        </Card>
      </section>

      <section className="p-4 my-2">
        <Bestsellers />
      </section>

      <Banners
        images={[
          { alt: "slice-2", src: "/images/landing/slice-2.png" },
          { alt: "slice-1", src: "/images/landing/slice-1.png" },
        ]}
      />

      <section>
        <Card className="p-4 my-2">
          <Advantages />
        </Card>
      </section>
    </div>
  );
}
