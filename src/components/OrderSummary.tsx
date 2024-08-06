import { useRouter } from "next/router";
import { useCartContext } from "@/context/context";
import { calculateTotalAmount } from "@/utils/helpers";
import MainButton from "./button";
import Input from "./Input";

const OrderSummary = () => {
  const { state, dispatch } = useCartContext();
  // console.log(state?.cart?.productIds, "tyu");
  const router = useRouter();

  const handleProduct = () => {
    // toast.success("Proceed to buy");
    router.push("/Checkout");
  };

  return (
    <div className="bg-[#EFF2F6] h-screen mt-[60px]">
      <div className="font-sans font-semibold text-[22px] text-[#000000]">
        Order Summary
      </div>
      <Input
        className="mt-[29px] font-sans text-[#A9ABBD] font-normal text-[14px] py-[11.5px] pl-[16px] outline-none bg-[#EFF2F6]"
        type={"text"}
        placeholder={"Enter coupon code here"}
        min={0}
        max={0}
      />
      <div className="h-[96px] mt-[27px]">
        <div className="flex justify-between pt-[16px] text-[14px] font-sans text-[#0D0D0D] font-normal">
          <div>Subtotal</div>
          <div>${calculateTotalAmount(state?.cart?.productIds)}</div>
        </div>
        <div className="flex justify-between pt-[16px] text-[14px] font-sans text-[#0D0D0D] font-normal">
          <div>Shipping</div>
          <div>Calculated at the next step</div>
        </div>
        <div className="border-[1px] mt-[16px] border-[#000000]"></div>
        <div className="flex justify-between pt-[16px] text-[14px] font-sans text-[#0D0D0D] font-normal">
          <div>Total</div>
          <div>${calculateTotalAmount(state?.cart?.productIds) ?? 0}</div>
        </div>
      </div>
      <MainButton
        className={
          "bg-[#0D0D0D] font-sans text-[#FFFFFF] mt-[72px] w-full text-[16px] font-semibold"
        }
        buttonName={"Continue to checkout"}
        // onChange = {() => router.push('/Address')}
        onClick={handleProduct}
        width={""}
        height={"50px"}
      />
    </div>
  );
};

export default OrderSummary;
