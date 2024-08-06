import Link from "next/link";
import Input from "./Input";

const Footer = () => {
  return (
    <div className="bg-[#EFF2F6] h-[100vh]">
      <div className="float-left pt-11 flex justify-between">
        <div className="ml-[145px]">
          <div className="font-sans font-semibold text-[36px]">
            Sign up for our newsletter
          </div>
          <div className="font-sans mt-[10px] mb-4 text-[14px] font-normal w-[400px] h-[32px]">
            Be the first to know about our special offers, new product launches
            and events
          </div>
          <div className="relative bg-[#EFF2F6] mt-[23px] w-[398px] h-[40px]">
            <Input
              className="w-full pr-[100px] pl-[16px] outline-none"
              placeholder={"Email Address"}
              type="email"
              min={10}
              max={12}
            />
            <button className="absolute right-0 top-[-10px] h-full justify-center py-[12px] px-4 font-sans font-bold text-[16px]">
              Sign Up
            </button>
          </div>
        </div>
        <div className="ml-[96px] flex-col">
          <div className="font-sans font-semibold text-[16px]">Shop</div>
          <div className="flex-col pt-[21px] font-sans font-normal text-[16px]">
            <div>
              <Link href={""}>Women&#39;s</Link>
            </div>
            <div>
              <Link href={""}>Men&#39;s</Link>
            </div>
            <div>
              <Link href={""}>Kids&#39;</Link>
            </div>
            <div>
              <Link href={""}>Shoes</Link>
            </div>
            <div>
              <Link href={""}>Equipment</Link>
            </div>
            <div>
              <Link href={""}>By Activity</Link>
            </div>
            <div>
              <Link href={""}>Gift Cards</Link>
            </div>
            <div>
              <Link href={""}>Sale</Link>
            </div>
          </div>
        </div>

        <div className="ml-[173px] flex-col">
          <div className="font-sans font-semibold text-[16px]">Help</div>
          <div className="flex-col pt-[21px] font-sans font-normal text-[16px]">
            <div>
              <Link href={""}>Help Center</Link>
            </div>
            <div>
              <Link href={""}>Order Status</Link>
            </div>
            <div>
              <Link href={""}>Size Chart</Link>
            </div>
            <div>
              <Link href={""}>Returns & Warranty</Link>
            </div>
            <div>
              <Link href={""}>Contact Us</Link>
            </div>
          </div>
        </div>

        <div className="ml-[177px] flex-col">
          <div className="font-sans font-semibold text-[16px]">About</div>
          <div className="flex-col pt-[21px] font-sans font-normal text-[16px]">
            <div>
              <Link href={""}>About Us</Link>
            </div>
            <div>
              <Link href={""}>Responsibility</Link>
            </div>
            <div>
              <Link href={""}>Technology & Innovation</Link>
            </div>
            <div>
              <Link href={""}>Explore our stories</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
