/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import bag from "../../public/images/Vector.svg";
import { useRouter } from "next/router";
import { InfoProps } from "@/utils/interface";
import { useCartContext } from "@/context/context";
import NavDropdown from "./NavDropdown";

interface NavProps {
  className?: string;
  width?: string;
  height?: string;
  placeholder?: string;
}

const CustomNav: React.FC<NavProps> = ({
  className,
  width,
  height,
  placeholder,
}) => {
  const router = useRouter();
  const path = router.pathname;
  const pathCheck = path.includes("/home");
  const [userData, setUserData] = useState<InfoProps | null>({
    role: "",
    email: "",
    full_name: "",
    accessToken: "",
    refreshToken: "",
  });

  // const checkPage = router.pathname === "/Home";
  const { state } = useCartContext();
  const cart_count = state?.cart?.cartCount;

  useEffect(() => {
    const getUserData = localStorage.getItem("userData") ?? "";
    if (getUserData) {
      const userInfo = JSON.parse(getUserData);
      setUserData(userInfo);
    }
  }, []);

  const hideRoutes = [
    "/admin-home",
    "/admin-dashboard",
    "/add-products",
    "/edit-products",
  ];
  const checkRoute = hideRoutes.find((e) => path.startsWith(e));
  // console.log(checkRoute, "check");
  const hideCheck = hideRoutes.includes(checkRoute as string);
  // console.log(hideCheck);

  // console.log(userData?.full_name)
  return (
    <div className="fixed w-[100%] top-0 z-50">
      <ul className="flex items-center h-[60px] justify-between pl-[145px] pr-[141.25px]">
        <div className="flex items-center">
          {hideCheck && (
            <div className="text-[22px] font-bold text-[#FFFFFF]">ADMIN</div>
          )}
          {!hideCheck && (
            <div>
              <li className="text-[#FFFFFF] font-inter font-normal pr-[32px]">
                <Link
                  className={`${
                    path === "/ecommerce"
                      ? "font-bold text-[20px]"
                      : "font-normal text-[17px]"
                  }`}
                  href={"/ecommerce"}
                >
                  Ecommerce
                </Link>
              </li>
              <li className="text-[#FFFFFF] font-inter font-normal pr-[32px]">
                <Link
                  className={`${
                    // path === "/Home"
                    pathCheck
                      ? "font-bold text-[20px]"
                      : "font-normal text-[17px]"
                  }`}
                  href={"/home"}
                >
                  Shop
                </Link>
              </li>
              <li className="text-[#FFFFFF] font-inter font-normal text-[17px] pr-[32px]">
                <Link
                  className={`${
                    path === "stories"
                      ? "font-bold text-[20px]"
                      : "font-normal text-[17px]"
                  }`}
                  href={"/stories"}
                >
                  Stories
                </Link>
              </li>
              <li className="text-[#FFFFFF] font-inter font-normal text-[17px] pr-[32px]">
                <Link
                  className={`${
                    path === "/about"
                      ? "font-bold text-[20px]"
                      : "font-normal text-[17px]"
                  }`}
                  href={"/about"}
                >
                  About
                </Link>
              </li>
            </div>
          )}
        </div>

        <div>
          <li
            className="text-[#FFFFFF] bg-[#111] font-inter font-normal text-[17px] pr-[32px]"
            style={{ float: "right" }}
          >
            <NavDropdown
              className="w-[120px]"
              options={[
                {
                  label: "Sign out",
                  value: "sign out",
                  route: "/login",
                  action: () => {
                    localStorage.removeItem("userData");
                    localStorage.removeItem("accessToken");
                    // signOut();
                  },
                },
              ]}
              placeholder={userData?.full_name}
            />
          </li>
          {!hideCheck && (
            <li
              className="text-[#FFFFFF] font-inter font-normal text-[17px] pr-[32px]"
              style={{ float: "right" }}
            >
              <div className="relative top-[3px]">
                <Image
                  className="flex items-center justify-center cursor-pointer"
                  src={bag}
                  onClick={() => router.push("/cart-screen")}
                  alt={"Bag"}
                />
                <span className="absolute top-[-3px] right-[-20px] text-[#FFFFFF] px-2 py-1 font-bold">
                  {cart_count}
                </span>
              </div>
              {/* </Link> */}
            </li>
          )}
        </div>
      </ul>
    </div>
  );
};

export default CustomNav;
