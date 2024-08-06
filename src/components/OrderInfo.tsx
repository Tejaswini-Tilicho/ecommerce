import Collapse from "./Collapse";

const OrderInfo = () => {
  return (
    <div className="bg-[#EFF2F6] h-screen mt-[60px]">
      <div className="text-[22px] font-semibold font-sans text-[#000000]">
        Order Information
      </div>
      <div className="border-[#000000] border-[1px] mt-[15px] mb-[16px]"></div>
      <Collapse
        headText={"Return Policy"}
        mainText={
          "This is our example return policy which is everything you need to know about our returns."
        }
      />
      <div className="border-[1px] border-[#909090] border-solid w-full my-[16px]"></div>
      <Collapse headText={"Shipping Options"} mainText={""} />
      <div className="border-[1px] border-[#909090] border-solid w-full my-[16px]"></div>
      <Collapse headText={"Shipping Options"} mainText={""} />
    </div>
  );
};

export default OrderInfo;
