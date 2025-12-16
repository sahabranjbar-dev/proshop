"use client";
import LoginButton from "@/components/LoginButton/LoginButton";
import { Modal } from "@/components/Modal/Modal";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, MapPin, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AddressForm from "./components/AddressForm";
import UserAddresses from "./components/UserAddresses";
import { useRouter } from "next/navigation";

// نوع داده برای آدرس
interface Address {
  id: string;
  province: string;
  city: string;
  address: string;
  plaque: string;
  floor: string;
  postalCode: string;
  phone: string;
  recipientName: string;
  title: string;
  isDefault: boolean;
}

export default function ShippingPage() {
  const { push } = useRouter();
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [sendingMethodId, setSendingMethodId] = useState<string>("");
  const queryClient = useQueryClient();
  const userId = session.data?.user?.id;

  const handleAddAddress = () => {
    setEditingAddress(null);
    setOpenModal(true);
  };

  const { data } = useQuery({
    queryKey: ["sending-methods"],
    queryFn: async () => {
      const result = await api("/sending-methods");
      return result.data;
    },
  });
  const sendingMethods = data?.sendingMethods ?? [];

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const result = await api.post("/orders", {
        sendingMethodId,
      });
    },
  });
  return (
    <div className="container mx-auto">
      {/* هدر صفحه */}
      <div className=" rounded-lg shadow-sm border m-4 p-6">
        <div className="flex items-center gap-4 mb-6">
          <ArrowRight className="w-5 h-5 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">اطلاعات ارسال</h1>
        </div>

        {isAuthenticated ? (
          <div className="space-y-6">
            {/* بخش افزودن آدرس جدید */}
            <button
              onClick={handleAddAddress}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center gap-2 p-4 w-fit">
                <Plus className="w-5 h-5" />
                <span className="font-medium">افزودن آدرس جدید</span>
              </div>
            </button>

            {/* لیست آدرس‌ها */}
            <UserAddresses />
            <div className="border-t">
              <div className="m-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  روش ارسال
                </h3>

                <div className="m-6">
                  <RadioGroup
                    onValueChange={setSendingMethodId}
                    dir="rtl"
                    defaultValue="option-one"
                  >
                    {sendingMethods.map((item: any) => {
                      return (
                        <div
                          key={item?.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={item?.id}
                            id={item?.englishTitle}
                          />
                          <Label
                            htmlFor={item?.englishTitle}
                            className="text-md"
                          >
                            {item?.farsiTitle}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              </div>
            </div>

            {/* دکمه ادامه به پرداخت */}
            <div className="pt-6 border-t">
              <button
                onClick={() => {
                  mutateAsync().then((data) => {
                    push("/checkout");
                  });
                }}
                className="text-center w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                ثبت سفارش
              </button>
            </div>
          </div>
        ) : (
          // حالت کاربر غیروارد شده
          <div className="text-center py-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                برای ثبت آدرس وارد شوید
              </h3>
              <p className="text-gray-600 mb-4">
                برای ذخیره و مدیریت آدرس‌های خود، لطفاً وارد حساب کاربری خود
                شوید.
              </p>
              <LoginButton />
            </div>
          </div>
        )}
      </div>

      {/* مودال فرم آدرس */}
      <Modal
        title={editingAddress ? "ویرایش آدرس" : "افزودن آدرس جدید"}
        onOpenChange={() => {
          setOpenModal(false);
          setEditingAddress(null);
        }}
        open={openModal}
        hideActions
        className="max-h-[95vh] overflow-scroll"
      >
        <AddressForm
          onSuccess={(data) => {
            setOpenModal(false);
            queryClient.invalidateQueries({
              queryKey: ["address", userId],
            });
          }}
        />
      </Modal>
    </div>
  );
}
