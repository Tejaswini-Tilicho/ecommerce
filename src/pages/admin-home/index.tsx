import { useRouter } from "next/router";
import { Button } from "antd";

const AdminHome = () => {
  const buttons = [
    { buttonName: "Add Product", marginTop: "mt-0", path: "/AddProducts" },
    {
      buttonName: "View Products",
      marginTop: "my-[72px]",
      path: "/AdminDashboard",
    },
  ];

  const router = useRouter();
  const path = router.pathname;

  return (
    <div className="bg-[#EFF2F6] h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex-col">
          {/* {buttons.map((button, index) => (
            <MainButton
              key={index}
              className={`bg-[#0D0D0D] text-[#FFFFFF] font-sans text-[16px] font-semibold ${button.marginTop}`}
              buttonName={button.buttonName}
              onClick={() => router.push(button.path)}
              width={"525px"}
              height={"75px"}
            />
          ))} */}
          <div>
            <Button
              className="bg-[#000] w-[525px] h-[75px] text-[16px] text-[#FFF]"
              onClick={() => router.push("/add-products")}
            >
              Add Products
            </Button>
          </div>
          <div>
            <Button
              className="bg-[#000] mt-[72px] w-[525px] h-[75px] text-[#FFF]"
              onClick={() => router.push("/admin-dashboard")}
            >
              View Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
