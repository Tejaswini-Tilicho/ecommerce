import { useCartContext } from "@/context/context";
import { useState } from "react";
import { useRouter } from "next/router";
import CustomCheckbox from "./CheckBox";
import MainButton from "./Button";

interface FinalOrderProps {
  finalOrderData: any;
}
const Shipping: React.FC<FinalOrderProps> = ({ finalOrderData }) => {
  // console.log(finalOrderData, "final");
  const router = useRouter();
  const { state, dispatch } = useCartContext();
  const [isShipping, setIsShipping] = useState(
    state?.checkout?.shipping?.shippingType
  );

  //   console.log(transformedData, "trans");

  const handleCheckboxChange = (shippingType: string) => {
    setIsShipping(shippingType);
    dispatch({ type: "SHIPPING_TYPE", payload: shippingType });
  };

  return (
    <div>
      <div className="w-full h-[89px] bg-[#FFFFFF]">
        <CustomCheckbox
          className={
            "pl-[19px] pt-[23px] text-[16px] text-[#111111] font-sans font-bold"
          }
          placeholder={"UPS/USPS Surepost"}
          onChange={() => handleCheckboxChange("sure_post")}
          checked={isShipping === "sure_post"}
        />
        <div className="ml-[47px]">4-7 Business Days</div>
      </div>
      <div className="w-full h-[89px] bg-[#FFFFFF] mt-[18px]">
        <CustomCheckbox
          className={
            "pl-[19px] pt-[23px] text-[16px] text-[#111111] font-sans font-bold"
          }
          placeholder={"UPS Ground Shipping "}
          onChange={() => handleCheckboxChange("ground_shipping")}
          checked={isShipping === "ground_shipping"}
        />
        <div className="ml-[47px]">3-5 Business Days</div>
      </div>
      <MainButton
        className={
          "bg-[#0D0D0D] text-[16px] text-[#FFFFFF] w-full h-[50px] font-sans font-semibold mt-[119px]"
        }
        buttonName={"Continue to payment"}
        onClick={finalOrderData}
        width={""}
        height={""}
      />
    </div>
  );
};

export default Shipping;
