import Header from "@/components/Header";
import CustomNav from "@/components/NavBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Public_Sans } from "next/font/google";
import { createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartContextProvider from "@/context/context";
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
    "/Login",
    "/ForgotPassword",
    "/reset-password",
    "/Registration",
  ];

  return (
    <div className={`${publicSans.className} h-full bg-[#EFF2F6]`}>
      <AuthProvider>
        <CartContextProvider>
          {!paths.includes(path) && <CustomNav />}
          {showHeader && <Header />}
          <ToastContainer />

          <div className="">
            <Component {...pageProps} />
          </div>
        </CartContextProvider>
      </AuthProvider>
    </div>
  );
}
