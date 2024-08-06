import { APIprops } from "@/utils/interface";
import { axiosInstance } from "./axios-instance";
import { toast } from "react-toastify";

export const getApi: React.FC<APIprops> = async ({ endUrl, params }) => {
  return axiosInstance.get(endUrl);
};

export const postApi: React.FC<APIprops> = async ({ endUrl, params, data }) => {
  // console.log(response, "resftgy");
  try {
    const response = await axiosInstance.post(endUrl, data);
    return response;
  } catch (err) {
    console.log(err, "err");
    toast.error(err?.message);
  }
};

export const putApi: React.FC<APIprops> = async ({ endUrl, params, data }) => {
  return axiosInstance.put(endUrl, data);
};

export const deleteApi: React.FC<APIprops> = async ({
  endUrl,
  params,
  data,
}) => {
  return axiosInstance.delete(endUrl, {
    data,
  });
};

export const patchApi: React.FC<APIprops> = async ({ endUrl, params, data }) => {
  // console.log(response, "resftgy");
  try {
    const response = await axiosInstance.patch(endUrl, data);
    return response;
  } catch (err) {
    console.log(err, "err");
    toast.error(err?.message);
  }
};

// export const patchApi: React.FC<APIprops> = async ({
//   endUrl,
//   params,
//   data,
// }) => {
//   return axiosInstance.patch(endUrl, data);
// };
