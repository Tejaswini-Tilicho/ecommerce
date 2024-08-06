import { getApi, postApi } from "@/api-client/methods";

export const getCartProducts = async ({ dispatch }: any) => {
  const response: any = await getApi({
    endUrl: "user/cart",
  });

  // console.log(response.data.products, "peof");
  dispatch({ type: "SYNC_API", payload: response?.data?.products });
};

export const postCartData = async ({
  product_id,
  size_id,
  color_id,
  quantity,
}: any) => {
  const postdata: any = await postApi({
    endUrl: `user/add-to-cart`,
    data: {
      product_id,
      size_id,
      color_id,
      quantity,
    },
  });

  return postdata;
};

export const getAddresses = async ({ dispatch }: any) => {
  const addressData: any = await getApi({
    endUrl: `user/addresses`,
  });
  // console.log(addressData, "address");
  if (addressData?.status) {
    dispatch({ type: "POST_ADDRESS", payload: addressData?.data?.addresses });
  }
};
