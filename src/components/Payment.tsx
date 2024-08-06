import Switch from "./Switch";
import CustomDropdown from "./CustomDropDown";
import pay from "../../public/images/paypal.png";
import apple from "../../public/images/applepay.png";
import MainButton from "./button";
import Input from "./Input";

const Payment = () => {
  return (
    <div>
      <div className="flex gap-[5.55px] max-w-full">
        <MainButton
          imageSrc={pay}
          className={
            "bg-[#FFFFFF] border border-[#1D4D90] h-[38.36px] w-full px-[47px] py-[11px]"
          }
          buttonName={""}
          onClick={function (): void {}}
          width={""}
          height={""}
          imgHeight={16}
          imgWidth={60}
        />
        <MainButton
          imageSrc={apple}
          className={"bg-[#252525]  w-full h-[38.36px] px-[47px] py-[11px]"}
          buttonName={""}
          onClick={function (): void {}}
          width={""}
          height={""}
          imgHeight={14}
          imgWidth={34}
        />
      </div>

      <div className="font-sans font-normal text-[20px] text-[#252525] my-[14px]">
        Payment Details
      </div>
      <div className="h-[40px]">
        <Input
          className="bg-[#EFF2F6] font-sans text-[14px] font-normal text-[#A9ABBD] py-[11.5px] pl-[16px]"
          type={"text"}
          placeholder={"Cardholder Name"}
          min={0}
          max={0}
        />
        <Input
          className="bg-[#EFF2F6] font-sans text-[14px] font-normal text-[#A9ABBD] py-[11.5px] pl-[16px] mt-[10px]"
          type={"number"}
          placeholder={"Card number"}
          min={0}
          max={0}
        />

        <div className="flex gap-[12px] w-full h-[40px] mt-[10px]">
          <CustomDropdown
            className="bg-[#EFF2F6] pl-[16px] flex items-center w-full py-[11.5px] font-sans font-normal text-[#A9ABBD] text-[14px]"
            options={[]}
          />
          <CustomDropdown
            className="bg-[#EFF2F6] pl-[16px] flex items-center w-full py-[11.5px] font-sans font-normal text-[#A9ABBD] text-[14px]"
            options={[
              { label: "Year", value: "year" },
              { label: "2024", value: "2024" },
              { label: "2025", value: "2025" },
            ]}
          />
          <Input
            className="bg-[#EFF2F6] pl-[16px] w-full py-[7px] font-sans font-normal text-[#A9ABBD] text-[14px]"
            type={"number"}
            placeholder={"CVC"}
            min={0}
            max={0}
          />
        </div>
        <div className="flex  justify-between mt-[28px]">
          <div className="font-sans font-normal text-[14px] text-[#000000]">
            Save card data for future payments
          </div>
          <div className="">
            <Switch />
          </div>
        </div>
        <MainButton
          className={
            "bg-[#0D0D0D] mt-[30px] w-full text-[#FFFFFF] text-[16px] font-sans font-semibold"
          }
          buttonName={"Pay with card"}
          onClick={function (): void {}}
          width={""}
          height={"50px"}
        />
      </div>
    </div>
  );
};

export default Payment;
