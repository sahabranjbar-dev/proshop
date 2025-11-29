import api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Edit, Loader2, MapPin, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { AddressFormData } from "./AddressForm";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const UserAddresses = () => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { data, refetch, isFetching, isLoading } = useQuery<{
    success: boolean;
    addresses: AddressFormData[];
    message: string;
  }>({
    queryKey: ["address", userId],
    queryFn: async () => {
      const result = await api("/address");
      return result.data;
    },
  });

  const { mutateAsync: deleteAddress } = useMutation({
    mutationFn: async (addressId: string) => {
      const result = await api.delete("/address", {
        params: {
          id: addressId,
        },
      });

      return result.data;
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(error.response?.data.error);
    },
    onSuccess: (data: { success: boolean; message: string }) => {
      toast.success(data.message);
      refetch();
    },
  });

  const { mutateAsync: setAsDefault } = useMutation({
    mutationFn: async (addressId: string) => {
      const result = await api.put("/address/set-as-default", {
        addressId,
      });

      return result.data;
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(error.response?.data.error);
    },
    onSuccess: (data: { success: boolean; message: string }) => {
      toast.success(data.message);
      refetch();
    },
  });

  const addresses = data?.addresses ?? [];

  const addressDeleteHandler = (addressId: string) => {
    deleteAddress(addressId);
  };

  const setAsDefaultHandler = (addressId: string) => {
    setAsDefault(addressId);
  };
  return (
    <div className="space-y-4 border p-2 rounded-2xl">
      <h2 className="text-lg font-semibold text-gray-900">آدرس‌های شما</h2>

      {isFetching || isLoading ? (
        <div className="flex justify-center items-center min-h-50">
          <Loader2 className="animate-spin" />
        </div>
      ) : addresses.length === 0 ? (
        <div className=" py-8 text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-center">هنوز آدرسی ثبت نکرده‌اید</p>
        </div>
      ) : (
        addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 ${
              address.isDefault
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{address.title}</h3>
                {address.isDefault && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    پیش‌فرض
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!address.isDefault && (
                  <button
                    onClick={() => {
                      if (!address.id) return;
                      setAsDefaultHandler(address.id);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    انتخاب به عنوان پیش‌فرض
                  </button>
                )}
                <button className="text-gray-600 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="text-gray-600 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        مطمئن هستید که میخواهید آدرس را پاک کنید؟
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        در صورت حذف آدرس دیگر قابل بازگشت نیست
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>انصراف</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          if (!address.id) return;
                          addressDeleteHandler(address?.id);
                        }}
                      >
                        بله
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              {(!!address.recipientName || !!session.data?.user?.name) && (
                <p>
                  <span className="font-medium">تحویل گیرنده:</span>
                  <span className="mx-2">
                    {address.recipientName || session.data?.user?.name}
                  </span>
                </p>
              )}
              {(!!address.phone || !!session.data?.user?.phone) && (
                <p>
                  <span className="font-medium">تلفن:</span>
                  <span className="mx-2">
                    {address.phone || session.data?.user?.phone}
                  </span>
                </p>
              )}
              <p>
                <span className="font-medium">آدرس:</span>
                <span className="mx-2">
                  {address.province}، {address.city}، {address.address}
                </span>
              </p>
              <p>
                <span className="font-medium">کد پستی:</span>
                <span className="mx-2">{address.postalCode}</span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserAddresses;
