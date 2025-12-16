"use client";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const CheckoutPage = () => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      const result = await api.post("/api/checkout", {
        orderId: "123456",
        amount: 100000,
      });

      // استخراج Token از XML پاسخ
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(result.data, "text/xml");
      const token = xmlDoc.getElementsByTagName("Token")[0]?.textContent;

      if (token) {
        window.location.href = `https://pec.shaparak.ir/NewIPG/?Token=${token}`;
      }
    },
  });

  const paymentClickHandler = () => {
    mutate(); // اینجا درخواست را می‌زنیم
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="border shadow rounded-lg p-4 m-2">
              <h2>روش پرداخت</h2>

              <p>انتخاب روش پرداخت</p>
            </div>
            <div className="border shadow rounded-lg p-4 m-2">
              <h2>کد تخفیف</h2>

              <p>
                می‌توانید در صورت امکان از کدهای ذخیره‌شده انتخاب کنید، یا
                خودتان یک کد وارد کنید.
              </p>
            </div>
            <div className="border shadow rounded-lg p-4 m-2">
              <h2>خلاصه سفارش</h2>

              <p>خلاصه سفارش</p>
            </div>
          </div>

          <div className="relative md:col-span-2">
            <div className="sticky top-0">
              <div className="">
                <div className="border shadow rounded-lg p-4 m-2">
                  <div className="flex justify-between items-center p-4 m-2 border-b">
                    <span>قیمت کالاها</span>
                    <span>۴۳,۸۰۰,۰۰۰</span>
                  </div>
                  <div className="flex justify-between items-center p-4 m-2 border-b">
                    <span>مجموع هزینه ارسال</span>
                    <span>۴۳,۸۰۰,۰۰۰</span>
                  </div>
                  <div className="flex justify-between items-center p-4 m-2 border-b">
                    <span>مبلغ قابل پرداخت</span>
                    <span>۴۳,۸۰۰,۰۰۰</span>
                  </div>

                  <Button onClick={paymentClickHandler} className="w-full my-2">
                    پرداخت
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
