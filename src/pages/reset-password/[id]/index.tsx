import MainButton from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { patchApi } from "@/api-client/methods";
import { validatePassword } from "@/utils/helpers";
import { toast } from "react-toastify";
import eyeOff from "../../../../public/images/eyeOff.jpg";
import eyeOpen from "../../../../public/images/eyeOpen.jpg";
import NextImage from "next/image";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

interface ResetProps {
  user_id: string;
  otp: string;
  new_password: string;
}

const ResetPassword = () => {
  const router = useRouter();
  const routerUser_id = router.query.id;
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [secondShowPassword, setSecondShowPassword] = useState(false);

  const [resetData, setResetData] = useState<ResetProps>({
    user_id: "",
    otp: "",
    new_password: "",
  });
  // console.log(resetData);
  const matchCheck = password === confirmPassword;

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
    setPasswordsMatch(true);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setIsConfirmPasswordValid(true);
    setPasswordsMatch(password === value);

    if (password === value) {
      setResetData((prevData) => ({
        ...prevData,
        user_id: routerUser_id as string,
      }));
      setResetData((prevData) => ({
        ...prevData,
        new_password: value,
      }));
    }
  };

  const ResetPassword = async () => {
    if (!isPasswordValid || !isConfirmPasswordValid || !matchCheck) {
      console.log("Password validation failed");
      return;
    }

    try {
      const postData: any = await patchApi({
        endUrl: "reset-password",
        data: resetData,
      });
      // console.log(postData, "post");
      toast.success(postData?.message);
      if (postData?.status) {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleSecondShowPassword = () => {
    setSecondShowPassword(!secondShowPassword);
  };

  return (
    <div className="bg-[#EFF2F6] h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="w-[456px] h-[365px] bg-[#FFFFFF] pl-[30px]">
          <div className="text-[#A9ABBD] text-[16px] font-sans font-medium mt-[30px]">
            Reset Password
          </div>
          <div className="w-[398px] h-[140px] flex flex-col gap-[10px]">
            <Input
              className="placeholder-[#A9ABBD] text-[#000000] font-sans font-normal text-[14px] py-[11.5px] pl-[16px] mt-[16px] w-[398px]"
              type="number"
              placeholder="Enter OTP"
              min={6}
              max={6}
              id="otp"
              onChange={(e) =>
                setResetData((prevData) => ({
                  ...prevData,
                  otp: e.target.value,
                }))
              }
            />
            <div className="relative">
              <Input
                className="placeholder-[#A9ABBD] text-[#000000] font-sans font-normal text-[14px] py-[11.5px] pl-[16px] w-[398px]"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onValidationChange={(isValid) => setIsPasswordValid(isValid)}
                min={8}
                max={15}
              />
              <NextImage
                className="absolute top-3 right-5 cursor-pointer"
                src={showPassword ? eyeOpen : eyeOff}
                alt={"Eyeoff"}
                onClick={toggleShowPassword}
              />
            </div>

            <div className="relative">
              <Input
                className="placeholder-[#A9ABBD] text-[#000000] font-sans font-normal text-[14px] py-[11.5px] pl-[16px] w-[398px]"
                type={secondShowPassword ? "text" : "password"}
                placeholder="Confirm Password"
                id="confirmPassword"
                passwordValue={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                onValidationChange={(isValid) =>
                  setIsConfirmPasswordValid(isValid)
                }
                min={8}
                max={15}
              />
              <NextImage
                className="absolute top-3 right-5 cursor-pointer"
                src={secondShowPassword ? eyeOpen : eyeOff}
                alt={"Eyeoff"}
                onClick={toggleSecondShowPassword}
              />
            </div>
          </div>
          {!passwordsMatch && (
            <div className="text-red-500 text-[10px] mt-[54px]">
              Passwords do not match
            </div>
          )}
          <div>
            <MainButton
              className={`${
                poppins.className
              } bg-[#000000] font-medium text-[14px] text-[#FFFFFF] mt-[78px] mb-[30px] ml-[134px] ${
                !isPasswordValid || !isConfirmPasswordValid || !matchCheck
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              buttonName="Reset Password"
              onClick={ResetPassword}
              width="129px"
              height="31px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
