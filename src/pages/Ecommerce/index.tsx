import { useEffect, useState } from "react";
import NextImage from "next/image";
import mainPage from "../../../public/images/main.jpg";
import logo from "../../../public/images/logos.png";
import { getApi } from "@/api-client/methods";
import Link from "next/link";
import { useRouter } from "next/router";
import { APIprops } from "@/utils/interface";
import MainButton from "@/components/Button";
import Footer from "@/components/Footer";
import { Button } from "antd";
import { Public_Sans } from "next/font/google";

const publicSans = Public_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Ecommerce = () => {
  const [homeData, setHomeData] = useState<any>([]);
  const router = useRouter();

  const styling = [
    { index: 0, className: "pb-[22px] mt-[151px]" },
    { index: 1, className: "pb-[107px] mt-[66px]" },
    { index: 0, className: "pb-[22px] mt-[151px]" },
  ];

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = (await getApi({
          endUrl: "home",
        })) as unknown as APIprops;
        setHomeData(response.data.products);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="bg-[#EFF2F6] h-auto">
      <div className="text-center font-semibold text-[56px] text-[#000000] font-sans pt-[126px]">
        {"Better clothing for the planet"}
      </div>
      <div className="m-auto max-w-[650px] pb-10">
        <div className="flex items-center justify-center text-center font-sans font-normal text-[20px] text-[#979797]">
          {
            "Create screens directly in Method or add your images from Sketch or Figma. You can even sync designs from your cloud storage!"
          }
        </div>
      </div>
      <div className="flex items-center justify-center">
        {/* <MainButton
          className={
            "border border-black m-auto text-[#0D0D0D] font-sans font-semibold text-[16px]"
          }
          buttonName={"Shop All"}
          onClick={() => router.push("/Home")}
          width={"194px"}
          height={"50px"}
        /> */}
        <Button
          className={`border border-black bg-[#EFF2F6] w-[194px] h-[50px] m-auto text-[#0D0D0D] ${publicSans.className} font-semibold text-[16px]`}
          onClick={() => router.push("/home")}
        >
          Shop All
        </Button>
      </div>

      <div className="w-[1114px] border border-black m-auto mt-[30px] mb-[31px]">
        <NextImage
          src={mainPage}
          alt={"Images weren't available"}
          width={1114}
          height={521}
        />
      </div>

      <div className="flex items-center justify-center">
        <NextImage src={logo} alt={"Logo disabled"} width={855} height={67} />
      </div>

      <div className="font-sans text-[56px] font-semibold text-[#000000] text-center pt-[126px]">
        Our latest Arrivals
      </div>

      <div className="m-auto max-w-[650px] pb-10">
        <div className="flex items-center justify-center text-center font-sans font-normal text-[20px] text-[#979797]">
          Create screens directly in Method or add your images from Sketch or
          Figma. You can even sync designs from your cloud storage!
        </div>
      </div>

      <div>
        <Link href={`home`}>
          <MainButton
            className={
              "border border-black m-auto text-[#0D0D0D] font-sans font-semibold text-[16px]"
            }
            buttonName={"Shop All"}
            onClick={() => router.push("/home")}
            width={"194px"}
            height={"50px"}
          />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-6 pl-[125px] cursor-pointer">
        {homeData?.map(
          (item: { images: string; product_id: any }, index: number) => {
            const style =
              styling.find((s) => s.index === index % styling.length) ||
              styling[0];
            return (
              // <div key={index} className={style.className}>
              <div
                key={index}
                className={`${style.className} transform transition-transform duration-300 hover:scale-110 hover:-translate-y-2`}
              >
                <NextImage
                  src={item.images[0]}
                  alt={"Images loading.."}
                  width={368}
                  height={521}
                  onClick={() => router.push(`home/${item?.product_id}`)}
                />
              </div>
            );
          }
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Ecommerce;

// import NextImage from "next/image";
// import mainPage from "../../../public/images/main.jpg";
// import logo from "../../../public/images/logos.png";
// import { getApi } from "@/api-client/methods";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import MainButton from "@/components/button";
// import Footer from "@/components/Footer";
// import { GetServerSideProps } from "next";

// const Ecommerce = ({ homeData }: any) => {
//   console.log(homeData);
//   const router = useRouter();

//   const styling = [
//     { index: 0, className: "pb-[22px] mt-[151px]" },
//     { index: 1, className: "pb-[107px] mt-[66px]" },
//     { index: 0, className: "pb-[22px] mt-[151px]" },
//   ];

//   return (
//     <div className="bg-[#EFF2F6] h-auto">
//       <div className="text-center font-semibold text-[56px] text-[#000000] font-sans pt-[126px]">
//         {"Better clothing for the planet"}
//       </div>
//       <div className="m-auto max-w-[650px] pb-10">
//         <div className="flex items-center justify-center text-center font-sans font-normal text-[20px] text-[#979797]">
//           {
//             "Create screens directly in Method or add your images from Sketch or Figma. You can even sync designs from your cloud storage!"
//           }
//         </div>
//       </div>
//       <div>
//         <MainButton
//           className={
//             "border border-black m-auto text-[#0D0D0D] font-sans font-semibold text-[16px]"
//           }
//           buttonName={"Shop All"}
//           onClick={() => router.push("/Home")}
//           width={"194px"}
//           height={"50px"}
//         />
//       </div>

//       <div className="w-[1114px] border border-black m-auto mt-[30px] mb-[31px]">
//         <NextImage
//           src={mainPage}
//           alt={"Images weren't available"}
//           width={1114}
//           height={521}
//         />
//       </div>

//       <div className="flex items-center justify-center">
//         <NextImage src={logo} alt={"Logo disabled"} width={855} height={67} />
//       </div>

//       <div className="font-sans text-[56px] font-semibold text-[#000000] text-center pt-[126px]">
//         Our latest Arrivals
//       </div>

//       <div className="m-auto max-w-[650px] pb-10">
//         <div className="flex items-center justify-center text-center font-sans font-normal text-[20px] text-[#979797]">
//           Create screens directly in Method or add your images from Sketch or
//           Figma. You can even sync designs from your cloud storage!
//         </div>
//       </div>

//       <div>
//         <Link href={`Home`}>
//           <MainButton
//             className={
//               "border border-black m-auto text-[#0D0D0D] font-sans font-semibold text-[16px]"
//             }
//             buttonName={"Shop All"}
//             onClick={() => router.push("/Home")}
//             width={"194px"}
//             height={"50px"}
//           />
//         </Link>
//       </div>
//       <div className="grid grid-cols-3 gap-6 pl-[125px]">
//         {homeData?.map(
//           (item: { images: string; product_id: any }, index: number) => {
//             const style =
//               styling.find((s) => s.index === index % styling.length) ||
//               styling[0];
//             return (
//               <div key={index} className={style.className}>
//                 <NextImage
//                   src={item.images[0]}
//                   alt={"Images loading.."}
//                   width={368}
//                   height={521}
//                   onClick={() => router.push(`Home/${item?.product_id}`)}
//                 />
//               </div>
//             );
//           }
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export async function getServerSideProps() {
//   try {
//     const response: any = await getApi({
//       endUrl: "home",
//     });
//     // console.log("success");
//     return {
//       props: { homeData: response.data.products },
//     };

//   }
//   catch (error) {
//     console.error("Error fetching home data:", error);
//     return {
//       props: { homeData: [] },
//     };
//   }
// }

// export default Ecommerce;
