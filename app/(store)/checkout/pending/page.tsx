"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const CheckoutPendingPage = () => {
  const router = useRouter();

  useEffect(() => {
    // بانک اطلاعات را به صورت POST می‌فرستد، برای تست، از query params هم می‌توان استفاده کرد
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("Token");
    const status = urlParams.get("status");

    if (token && status === "0") {
      api
        .post("/api/confirm-payment", { token })
        .then((res) => {
          console.log("ConfirmPayment Response:", res.data);
          // اگر Confirm موفق بود، هدایت کاربر به صفحه موفقیت
          router.push("/checkout/success");
        })
        .catch((err) => {
          console.error(err);
          router.push("/checkout/failure");
        });
    } else {
      router.push("/checkout/failure");
    }
  }, [router]);

  return <div>در حال پردازش تراکنش...</div>;
};

export default CheckoutPendingPage;
