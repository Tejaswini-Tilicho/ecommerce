import { useState } from "react";
import { Poppins } from "next/font/google";
import { validateEmail } from "@/utils/helpers";
import Input from "@/components/Input";
import MainButton from "@/components/button";
import { postApi } from "@/api-client/methods";
import { toast } from "react-toastify";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (value: any) => {
    // console.log(value?.target?.value, "Emailval");
    setEmail(value?.target?.value);
    let isValid = validateEmail(value?.target?.value);
    // console.log(isValid);
    setIsEmailValid(isValid);
  };

  const handleOtp = async () => {
    console.log(isEmailValid, "is", email);
    if (!isEmailValid) {
      console.log("Invalid email");
    }
    try {
      const postEmail: any = await postApi({
        endUrl: "generate-otp",

        data: { email },
      });
      toast.success(postEmail?.message);
    } catch (err) {
      console.log("Invalid email few", err);
    }
  };

  return (
    <div className="bg-[#EFF2F6] h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="w-[456px] h-[252px] bg-[#FFFFFF] pl-[30px]">
          <div className="font-sans font-medium text-[16px] text-[#A9ABBD] pt-[30px]">
            Forgot Password
          </div>
          <div className="font-sans font-medium text-[16px] text-[#979797] w-[397px] pt-[12px]">
            Please enter your registered email address where we’ll send you an
            OTP to reset your password.
          </div>
          <div className="w-[398px] h-[40px] pt-[11px]">
            <Input
              className="font-sans font-normal text-[14px] py-[11.5px] pl-[16px] outline-none"
              type="email"
              id="email"
              placeholder="Email"
              min={0}
              max={0}
              value={email}
              onChange={handleEmailChange}
              // onValidationChange={(isValid) => setIsEmailValid(isValid)}
            />
          </div>
          <div className="pt-[48px] ml-[147px]">
            <MainButton
              className={`${
                poppins.className
              } mb-[30px] w-[100px] h-[31px] bg-[#000000] text-[#FFFFFF] text-[14px] ${
                !isEmailValid ? " bg-[#A9ABBD]" : "cursor-pointer bg-[#000000]"
              }`}
              buttonName="Send OTP"
              onClick={handleOtp}
              // disabled={!isEmailValid}
              width=""
              height=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
