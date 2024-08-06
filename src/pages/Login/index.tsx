import { validateEmail, validatePassword } from "@/utils/helpers";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { postApi } from "@/api-client/methods";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import MainButton from "@/components/button";
import CustomCheckbox from "@/components/CheckBox";
import eyeOff from "../../../public/images/eyeOff.jpg";
import NextImage from "next/image";
import eyeOpen from "../../../public/images/eyeOpen.jpg";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleEmailChange = (value: string) => {
    const isValid = validateEmail(value);
    setEmail(value);
    setIsEmailValid(isValid);
  };

  const handlePasswordChange = (value: string) => {
    const isValid = validatePassword(value);
    setPassword(value);
    setIsPasswordValid(isValid);
  };

  const handleSubmit = async () => {
    // console.log("Teju");
    if (!isEmailValid || !isPasswordValid) {
      console.log("Form validation failed");
      return;
    }

    try {
      const apiData: any = await postApi({
        endUrl: "login",
        data: { email: email, password: password },
      });
      // console.log(apiData?.status, "apiStat");
      // console.log(apiData?.status, apiData?.message, apiData?.data);
      if (apiData) {
        // console.log("Tej");
        const { status, message, data } = apiData;
        // console.log(status, "sts");
        localStorage.setItem("userData", JSON.stringify(data));
        let accessToken = apiData?.data?.accessToken;
        let refreshToken = apiData?.data?.refreshToken;
        let role = apiData?.data?.role;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", JSON.stringify(role));
        const userData = JSON.parse(localStorage.getItem("userData") ?? "");
        // console.log(userData?.full_name);
        // console.log();
        setTimeout(() => {
          if (status) {
            console.log(localStorage.getItem("accessToken"), "tej", data);
            if (data?.role === "customer") {
              toast.success("Login Successful");
              router.push("/Ecommerce");
            } else {
              // console.log("admin");
              toast.success("Admin login successful");
              router.push("/AdminHome");
            }
          } else {
            // console.log("chan");
            toast.error(message);
          }
        }, 500);
      }
    } catch (err) {
      toast.error("ERROR");
      console.log(err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <div className="bg-backgroundPrimary h-[100vh]">
      <div className="pt-[200px]">
        <div className="flex justify-center items-center">
          <div className="bg-[#FFFFFF] w-full h-fit px-[29px] mx-[471px]">
            <div className="pt-[30px] font-sans font-semibold text-[22px]">
              Welcome Back
            </div>
            <div className="text-[#A9ABBD] font-sans font-medium text-[16px] pt-[8px]">
              Login with email
            </div>
            <div className="flex flex-col gap-[10px] mt-[10px]">
              <Input
                className="py-[11.5px] mt-[4px] border border-black w-full h-full pl-[16px] text-[14px] outline-none"
                type="email"
                id="email"
                placeholder="Email"
                onChange={(e) => handleEmailChange(e.target.value)}
                value={email}
                onValidationChange={(isValid) => setIsEmailValid(isValid)}
              />

              <div className="relative">
                <Input
                  className="border border-black w-full h-full py-[11.5px] pl-[16px] text-[14px] outline-none"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  value={password}
                  onValidationChange={(isValid) => setIsPasswordValid(isValid)}
                />
                <NextImage
                  className="absolute top-3 right-5 cursor-pointer"
                  src={showPassword ? eyeOpen : eyeOff}
                  alt={"Eyeoff"}
                  onClick={toggleShowPassword}
                />
              </div>
            </div>
            <div className="flex justify-between mt-[19px]">
              <div>
                <CustomCheckbox
                  className="text-[#979797] font-sans font-normal text-[14px]"
                  placeholder="Remember Me"
                  onChange={undefined}
                  checked={false}
                />
              </div>
              <Link href="/ForgotPassword">
                <div className="text-[#979797] font-sans font-bold text-[14px] pr-[25px]">
                  Forgot Password?
                </div>
              </Link>
            </div>

            <div className="flex justify-center py-[15px]">
              <MainButton
                className={`text-[14px] ${poppins.className} font-medium ${
                  isFormValid
                    ? "bg-[#000000] text-[#FFFFFF] cursor-pointer"
                    : "bg-[#979797] text-[#FFFFFF] cursor-not-allowed"
                }`}
                buttonName="Login"
                onClick={handleSubmit}
                width="95px"
                height="31px"
              />
            </div>
            {/* <div>Tej</div> */}
          </div>
        </div>
        <div className="flex-col">
          {/* <div>Teju</div> */}
          <div className="flex-col">
            <div className="flex items-center justify-center pt-[14px]">
              <div
                className={`${poppins.className} text-[#A9ABBD] text-[14px] font-normal`}
              >
                Or create an
                <Link href={"/Registration"}>
                  <span className="font-bold"> account</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
