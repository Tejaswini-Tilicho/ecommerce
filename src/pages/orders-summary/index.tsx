import jacket from "../../../public/images/blackJacket.jpg";
import NextImage from "next/image";
import Input from "@/components/Input";
import MainButton from "@/components/Button";

const OrdersSummary = () => {
  const buttons = [
    { buttonName: "Load more orders", width: "298px", height: "50px" },
    { buttonName: "Back", width: "149px", height: "50px" },
  ];
  return (
    <div className="ml-[145px]">
      <div className="flex">
        <div className="w-[70%]">
          <div className="pt-[154px] font-sans text-[#000000] font-semibold text-[36px]">
            Order Summary 123
          </div>
          <div className="flex mt-[42px]">
            <NextImage
              className="h-[133px]"
              src={jacket}
              alt={"Image not found"}
              width={129}
              height={133}
            />
            <div className="flex flex-col h-[133px] ml-[7px]">
              <div className="font-sans text-[#000000] font-semibold text-[22px]">
                Men&#39;s winter jacket
              </div>
              <div className="flex justify-between">
                <div className="text-[#000000] font-normal font-sans text-[14px]">
                  Size: L
                </div>
                <div className="text-[#000000] font-normal font-sans text-[14px]">
                  Quantity: 1
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-[#000000] font-normal font-sans text-[14px]">
                  Color: Red
                </div>
                <div className="text-[#000000] font-normal font-sans text-[14px]">
                  Type: Jacket
                </div>
              </div>
              <div className="font-sans text-[#000000] font-semibold text-[22px]">
                $99
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[60px] w-[30%] mr-[162px]">
          <Input
            className="w-full h-[39px] p-[7px] mt-[116px] bg-[#EFF2F6]"
            type={"text"}
            placeholder={"Search for order with order ID or user ID"}
            min={0}
            max={0}
            id={"text"}
          />
          <MainButton
            className={
              "border border-black w-full text-[#0D0D0D] text-[16px] font-sans font-semibold mt-[88px]"
            }
            buttonName={"View Order Status"}
            onClick={function (): void {}}
            width={""}
            height={"49px"}
          />
        </div>
      </div>
      <div className="my-[17px] border border-[#909090] border-solid h-[1px] mr-[162px]"></div>
      <div className="flex">
        <div className="w-[70%]">
          <div className="flex">
            <NextImage
              className="h-[133px]"
              src={jacket}
              alt={"Image not found"}
              width={129}
              height={133}
            />
            <div className="flex flex-col h-[133px] ml-[7px]">
              <div className="font-sans text-[#000000] font-semibold text-[22px]">
                Men&#39;s winter jacket
              </div>
              <div className="flex justify-between">
                <div className="text-[#000000] font-normal font-sans text-[14px]">
                  Size: L
                </div>
                <div className="text-[#000000] font-normal font-sans text-[14px]">
                  Quantity: 1
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-[#000000] font-normal font-sans text-[14px]">
                  Color: Red
                </div>
                <div className="text-[#000000] font-normal font-sans text-[14px]">
                  Type: Jacket
                </div>
              </div>
              <div className="font-sans text-[#000000] font-semibold text-[22px]">
                $99
              </div>
            </div>
          </div>
        </div>

        <div className="w-[30%] mr-[162px]">
          <MainButton
            className={
              "border border-black w-full text-[#0D0D0D] text-[16px] font-sans font-semibold mt-[47px]"
            }
            buttonName={"View Order Status"}
            onClick={function (): void {}}
            width={""}
            height={"49px"}
          />
        </div>
      </div>
      <div className="my-[17px] border border-[#909090] border-solid h-[1px] mr-[162px]"></div>
      <div className="flex">
        <div className="w-[70%]">
          <div className="flex">
            <NextImage
              className="h-[133px]"
              src={jacket}
              alt={"Image not found"}
              width={129}
              height={133}
            />
            <div className="flex flex-col h-[133px] ml-[7px]">
              <div className="font-sans text-[#000000] font-semibold text-[22px]">
                Men&#39;s winter jacket
              </div>
              <div className="flex justify-between">
                <div className="text-[#000000] font-normal font-sans text-[14px]">
                  Size: L
                </div>
                <div className="text-[#000000] font-normal font-sans text-[14px]">
                  Quantity: 1
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-[#000000] font-normal font-sans text-[14px]">
                  Color: Red
                </div>
                <div className="text-[#000000] font-normal font-sans text-[14px]">
                  Type: Jacket
                </div>
              </div>
              <div className="font-sans text-[#000000] font-semibold text-[22px]">
                $99
              </div>
            </div>
          </div>
        </div>

        <div className="w-[30%] mr-[162px]">
          <MainButton
            className={
              "border border-black w-full text-[#0D0D0D] text-[16px] font-sans font-semibold mt-[47px]"
            }
            buttonName={"View Order Status"}
            onClick={function (): void {}}
            width={""}
            height={"49px"}
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-[56px] mt-[75px] pb-[49px]">
        {buttons.map((button, index) => (
          <MainButton
            key={index}
            className={
              "bg-[#0D0D0D] text-[#FFFFFF] font-sans font-semibold text-[16px]"
            }
            buttonName={button.buttonName}
            onClick={function (): void {}}
            width={button.width}
            height={button.height}
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersSummary;
