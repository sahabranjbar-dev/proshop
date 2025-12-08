import Link from "next/link";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="flex items-center justify-center p-4 w-full">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
          <div className="bg-blue-500 text-white p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <Link href={"/"}>
                <h1 className="text-3xl font-bold mb-2">
                  فروشگاه شایان اسپارک پلاگ
                </h1>
              </Link>
            </div>
          </div>

          {/* فرم */}
          <div className="p-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
