import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import Router from "next/router";

export const getAccessToken = () => localStorage?.getItem("accessToken");

const getRefreshToken = () => localStorage?.getItem("refreshToken");

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = getAccessToken();
  //   const token = "nhninni";
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

console.log("object");

axiosInstance.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  async (error) => {
    const originalRequest = error.config;
    let res = error.response;
    if (res?.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const data = await axios({
          url: `${BASE_URL}refresh-auth`,
          method: "post",
          data: { refresh_token: getRefreshToken() },
        });
        const accessToken = data?.data?.accessToken;
        localStorage.setItem("accessToken", accessToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // toast.error(err.message);
        console.error("Token refresh failed:", { err });

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        console.log("insid eerror");
        Router.push("/Login"); // Redirect to login page
      }
    }
    return Promise.reject(error?.response?.data);
  }
);
