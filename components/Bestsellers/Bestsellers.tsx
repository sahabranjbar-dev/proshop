import React from "react";
import ProductCardContainer from "../ProductCardContainer/ProductCardContainer";
import ProductCard from "../ProductCard/ProductCard";

const Bestsellers = () => {
  return (
    <ProductCardContainer title="پرفروش‌ترین‌ها">
      <div className="flex justify-start items-center gap-2 overflow-scroll">
        {[...Array(20)].map((item: any, index) => (
          <ProductCard
            key={index}
            productId={item?.id}
            productPrice={2143434}
            productTitle="شمع انژکتوری پایه کوتاه"
            productDescription="توضیحات شمع انژکتوری پایه کوتاه لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز"
          />
        ))}
      </div>
    </ProductCardContainer>
  );
};

export default Bestsellers;
