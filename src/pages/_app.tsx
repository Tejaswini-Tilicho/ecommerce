import Header from "@/components/Header";
import CustomNav from "@/components/NavBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Public_Sans } from "next/font/google";
import { createContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartContextProvider from "@/context/context";
import Modal from "react-modal";
import { ConfigProvider } from "antd";
import AuthProvider from "@/components/Authenticator";

const publicSans = Public_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const ProductContext = createContext<any>(null);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showHeader = router.pathname === "/Home";
  const path = router.pathname;

  const paths = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/registration",
  ];

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return (
    <div className={`${publicSans.className} h-full bg-[#EFF2F6]`}>
      <AuthProvider>
        <CartContextProvider>
          <ConfigProvider>
            {!paths.includes(path) && <CustomNav />}
            {showHeader && <Header />}
            <ToastContainer />

            <div className="">
              <Component {...pageProps} />
            </div>
          </ConfigProvider>

          {/* <SampleModal /> */}
        </CartContextProvider>
      </AuthProvider>
    </div>
  );
}
