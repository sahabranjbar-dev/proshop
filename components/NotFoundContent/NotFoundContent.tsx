import Image from "next/image";

const NotFoundContent = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Image src={"/svg/404.svg"} alt="404" width={700} height={700} />
    </div>
  );
};

export default NotFoundContent;
