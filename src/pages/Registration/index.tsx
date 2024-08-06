import { useState } from "react";
import CustomCheckbox from "@/components/CheckBox";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { postApi } from "@/api-client/methods";
import { RegisterProps } from "@/utils/interface";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import Input from "@/components/Input";
import MainButton from "@/components/button";
import { validateEmail, validatePassword } from "@/utils/helpers";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Registration = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async () => {
    const registerData: RegisterProps = {
      full_name: formState.name,
      email: formState.email,
      password: formState.password,
    };

    try {
      const getRegisterData: any = await postApi({
        endUrl: "user/create-user",
        data: registerData,
      });

      if (getRegisterData) {
        const { status, message } = getRegisterData;
        if (status && message === "User already exist") {
          toast.error(message);
        } else {
          toast.success(message);
          router.push("/Login");
        }
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed.");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));

    if (field === "email") {
      setIsEmailValid(validateEmail(value));
    } else if (field === "password") {
      setIsPasswordValid(validatePassword(value));
      setPasswordsMatch(value === formState.confirmPassword);
      setPasswordError("");
    } else if (field === "confirmPassword") {
      setPasswordsMatch(value === formState.password);
      if (value !== formState.password) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };
  const isFormValid = () => {
    return formState.name && isEmailValid && isPasswordValid && passwordsMatch;
  };

  return (
    <div className="bg-backgroundPrimary h-screen flex justify-center items-center">
      <div className="bg-[#FFFFFF] p-8 rounded-lg w-full mx-[472px]">
        <div className="text-[#A9ABBD] font-medium text-[16px] font-sans mb-[16px]">
          Create an account
        </div>
        <div className="flex flex-col gap-[10px]">
          <Input
            className="py-[6.5px] pl-[16px]"
            type="text"
            placeholder="Name"
            onChange={(e) => handleChange("name", e.target.value)}
            value={formState.name}
            id="name"
            min={5}
            max={15}
          />
          <Input
            className="py-[6.5px] pl-[16px]"
            type="email"
            placeholder="Email"
            onChange={(e) => handleChange("email", e.target.value)}
            value={formState.email}
            id="email"
            onValidationChange={setIsEmailValid}
          />
          <Input
            className="py-[6.5px] pl-[16px]"
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange("password", e.target.value)}
            value={formState.password}
            id="password"
            onValidationChange={setIsPasswordValid}
          />
          <Input
            className="py-[6.5px] pl-[16px]"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            value={formState.confirmPassword}
            id="confirmPassword"
            passwordValue={formState.password}
            onValidationChange={setPasswordsMatch}
          />
          {!passwordsMatch && (
            <div className="text-red-600 font-sans text-[10px]">
              {passwordError}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <CustomCheckbox
            placeholder="Remember Me"
            className="text-[#979797] font-normal text-sm"
            onChange={undefined}
            checked={false}
          />
        </div>

        <div className="flex justify-center mt-6">
          <MainButton
            buttonName="Sign Up"
            className={`text-sm ${poppins.className} font-medium ${
              isFormValid()
                ? "bg-[#000000] text-[#FFFFFF] cursor-pointer"
                : "bg-[#A9ABBD] text-[#FFFFFF] cursor-not-allowed"
            }`}
            onClick={handleRegister}
            width="95px"
            height="31px"
          />
        </div>

        <div className="flex justify-center mt-4 text-sm">
          <span className={`text-[#A9ABBD] ${poppins.className}`}>
            Already have an account?{" "}
          </span>
          <Link href="/Login">
            <div className={`font-bold text-[#A9ABBD] ${poppins.className}`}>
              <u>Login</u>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
