import BrandsLogo from "@/components/BrandsLogo/BrandsLogo";
import Festival from "@/components/Festival/Festival";
import Hero from "@/components/Hero/Hero";
import { Card } from "@/components/ui/card";

export default async function Home() {
  return (
    <div className="container mx-auto m-2">
      <Card className="p-4 my-2">
        <Hero />
      </Card>

      <Festival />

      <Card>
        <BrandsLogo />
      </Card>
    </div>
  );
}
