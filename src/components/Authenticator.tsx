import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";

const Auth = createContext<any>(null);
interface AuthProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [accessCheck, setAccessCheck] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const authenticationRoutes = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/registration",
  ];
  const adminRoutes = [
    "/admin-home",
    "/admin-dashboard",
    "/add-products",
    "/edit-products",
  ];
  // const [isPending, startTransition]= useTransition();
  useEffect(() => {
    setIsLoading(true);
    const routerPath = router.pathname;
    const { asPath, pathname } = router;

    console.log(asPath);

    const accessToken = localStorage.getItem("accessToken");
    const role = JSON.parse(localStorage.getItem("role") || "");
    const check = authenticationRoutes.find((e) => routerPath.startsWith(e));
    // console.log(check, "check");

    const checkRoute = adminRoutes.find((e) => routerPath.startsWith(e));

    // console.log(role === "admin", "dqwdqw", role);
    if (router?.isReady) {
      // console.log(
      //   !adminRoutes.includes(routerPath),
      //   adminRoutes.includes(checkRoute as string),
      //   routerPath,
      //   "defg"
      // );

      if (
        !accessToken &&
        !authenticationRoutes?.includes(routerPath) &&
        !routerPath.includes(check as string)
        // && !routerPath.startsWith("/reset-password/")
      ) {
        router.push("/login");
      } else if (
        accessToken &&
        authenticationRoutes.includes(routerPath) &&
        role !== "admin"
      ) {
        router.push("/home");
      }

      if (accessToken) {
        if (role === "admin") {
          // setIsAdmin(true);
          // console.log(role, "role122", !adminRoutes.includes(routerPath));
          if (
            !adminRoutes.includes(routerPath) &&
            !adminRoutes.includes(checkRoute as string)
          ) {
            router.push("/admin-home");
          }
        } else if (adminRoutes?.includes(routerPath)) {
          router.push("/home");
        }
      }
    }

    // console.log(typeof routerPath, "inside authr");

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <Auth.Provider value={{}}>{children}</Auth.Provider>
    </div>
  );
}
