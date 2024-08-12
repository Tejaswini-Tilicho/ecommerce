import { Poppins } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { postApi } from "@/api-client/methods";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Button, Checkbox, Form, Input } from "antd";
import { Public_Sans } from "next/font/google";
import useCookie from "react-use-cookie";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const Login = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();
  const [emailCookie, setEmailCookie] = useCookie("email", "");
  const [passwordCookie, setPasswordCookie] = useCookie("password", "");
  const [form] = Form.useForm();

  const handleFinish = async (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    const { email, password, remember } = values;

    try {
      const apiData: any = await postApi({
        endUrl: "login",
        data: { email, password },
      });

      if (apiData) {
        const { status, message, data } = apiData;
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("accessToken", data?.accessToken);
        localStorage.setItem("refreshToken", data?.refreshToken);
        localStorage.setItem("role", JSON.stringify(data?.role));

        if (status) {
          toast.success("Login Successful");

          if (remember) {
            setEmailCookie(email);
            setPasswordCookie(password);
          } else {
            setEmailCookie("");
            setPasswordCookie("");
          }

          router.push(data?.role === "customer" ? "/ecommerce" : "/admin-home");
        } else {
          toast.error(message);
        }
      }
    } catch (err) {
      toast.error("ERROR");
      console.log(err);
    }
  };

  const handleFieldsChange = (_: any, allFields: any[]) => {
    const allValid = allFields.every((field) => field.errors.length === 0);
    setIsFormValid(allValid);
  };

  const initialValues = {
    email: emailCookie,
    password: passwordCookie,
    remember: emailCookie && passwordCookie,
  };

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
            <div className="flex flex-col">
              <Form
                form={form}
                className={`font-primary font-medium ${publicSans.className} text-[#A9ABBD]`}
                name="loginForm"
                layout="vertical"
                initialValues={initialValues}
                onFinish={handleFinish}
                onFieldsChange={handleFieldsChange}
              >
                <Form.Item
                  className={`font-primary font-medium`}
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Please enter a valid email!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    className={`font-primary text-[14px] font-normal mt-[14px] ${publicSans.className}`}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  className="font-primary font-medium"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      min: 8,
                    },
                    {
                      max: 15,
                    },
                    {
                      pattern:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!",
                    },
                  ]}
                >
                  <Input.Password
                    className={`font-primary text-[14px] font-normal ${publicSans.className} placeholder:text-[#A9ABBD]`}
                    placeholder="Password"
                  />
                </Form.Item>

                <div className="flex justify-between">
                  <Form.Item<FieldType>
                    className="text-[#979797]"
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 0, span: 30 }}
                  >
                    <Checkbox className={`${publicSans.className}`}>
                      Remember me
                    </Checkbox>
                  </Form.Item>
                  <Link href="/forgot-password">
                    <Button
                      className={`${publicSans.className} font-bold`}
                      type="link"
                    >
                      Forgot Password?
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center">
                  <Button
                    className={`text-[14px] mb-[14px] bg-[#000000] text-[#FFFFFF] cursor-pointer ${poppins.className} font-normal
                        `}
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="flex-col">
          <div className="flex items-center justify-center">
            <div
              className={`${poppins.className} text-[#A9ABBD] text-[14px] font-normal`}
            >
              Or create an
              <Link href={"/registration"}>
                <Button
                  className={`${poppins.className} text-[#A9ABBD] text-[14px] font-bold`}
                  type="link"
                >
                  account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
