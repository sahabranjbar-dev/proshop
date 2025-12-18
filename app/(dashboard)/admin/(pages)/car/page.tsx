import { Card } from "@/components/ui/card";
import ListContainer from "@/container/ListContainer/ListContainer";
import CarBrandHeader from "./_components/CarBrandHeader";
import CarBrandList from "./_components/CarBrandList";
import CarModelHeader from "./_components/CarModelHeader";
import CarModelList from "./_components/CarModelList";
import { Separator } from "@/components/ui/separator";

const CarPage = () => {
  return (
    <Card>
      <div>
        <h2 className="text-lg font-semibold">برند خودرو</h2>
        <Separator className="my-4" />
        <ListContainer queryKey={["car-brand"]} url="/admin/car/car-brand">
          <CarBrandHeader />
          <CarBrandList />
        </ListContainer>
      </div>

      <div className="mt-16">
        <h2 className="text-lg font-semibold">مدل خودرو</h2>
        <Separator className="my-4" />
        <ListContainer queryKey={["car-model"]} url="/admin/car/car-model">
          <CarModelHeader />
          <CarModelList />
        </ListContainer>
      </div>
    </Card>
  );
};

export default CarPage;
