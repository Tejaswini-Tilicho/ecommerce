import MainButton from "@/components/Button";
import Input from "@/components/Input";

const Orders = () => {
  const orders = [
    { order_id: 123, user_id: "A1" },
    { order_id: 124, user_id: "A2" },
    { order_id: 125, user_id: "A3" },
  ];

  const buttons = [
    { buttonName: "Load more orders", width: "298px", height: "50px" },
    { buttonName: "Back", width: "149px", height: "50px" },
  ];

  return (
    <div className="ml-[145px] mr-[154px]">
      <div className="flex">
        <div className="flex-col w-[70%]">
          <div className="font-sans font-semibold text-[36px] text-[#000000] pt-[154px]">
            Orders
          </div>
          <div className="font-sans font-semibold text-[22px] text-[#000000] mt-[86px]">
            <div>Order ID: 123</div>
            <div>User ID: A1</div>
          </div>
        </div>

        <div className="mt-[60px] w-[30%]">
          <Input
            className="w-full h-[39px] p-[7px] mt-[116px] bg-[#EFF2F6]"
            type={"text"}
            placeholder={"Search for order with order ID or user ID"}
            min={0}
            max={0}
          />
          <MainButton
            className={
              "border border-black w-full text-[#0D0D0D] text-[16px] font-sans font-semibold mt-[88px]"
            }
            buttonName={"View Order"}
            onClick={function (): void {}}
            width={""}
            height={"49px"}
          />
        </div>
      </div>
      <div className="mt-[78px] border border-[#909090] border-solid h-[1px]"></div>
      {orders.map((order, index) => (
        <div key={order.order_id}>
          <div className="flex">
            <div className="w-[70%] font-sans font-semibold text-[22px] text-[#000000] mt-[18px]">
              <div>Order ID: {order.order_id}</div>
              <div>User ID: {order.user_id}</div>
            </div>
            <div className="w-[30%]">
              <MainButton
                className={
                  "border border-black w-full text-[#0D0D0D] text-[16px] font-sans font-semibold mt-[58px]"
                }
                buttonName={"View Order"}
                onClick={function (): void {}}
                width={""}
                height={"49px"}
              />
            </div>
          </div>
          {index < orders.length - 1 && (
            <div className="mt-[78px] border border-[#909090] border-solid h-[1px]"></div>
          )}
        </div>
      ))}

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

export default Orders;
