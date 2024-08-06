/* eslint-disable @next/next/no-img-element */
import order from "../../public/images/orderPlaced.jpg";
import MainButton from "@/components/button";
import NextImage from "next/image";
import { useRouter } from "next/router";

const OrderPlaced = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <NextImage src={order} alt="Order placed" width={500} height={500} />
      <MainButton
        className={
          "bg-[#000000] text-[#FFFFFF] p-[10px] mt-[50px] flex items-center justify-center"
        }
        buttonName={"Back to Home"}
        onClick={() => router.push("/Home")}
      />
    </div>
  );
};

export default OrderPlaced;
