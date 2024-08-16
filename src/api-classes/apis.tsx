import { APIprops, PostAddressProps } from "@/utils/interface";
import { deleteApi, getApi, postApi } from "@/api-client/methods";
import { toast } from "react-toastify";
import { getCartProducts } from "@/utils/common/common.api";

export const BASE_URL = "http://13.233.117.58:3000/api/v1/";

export class ProductClass {
  adminPath: string;
  cartPath: string;
  homePath: string;
  dispatch: any;
  constructor(path: string) {
    this.adminPath = `${BASE_URL}admin/${path}`;
    this.cartPath = `${BASE_URL}user/${path}`;
    this.homePath = `${BASE_URL}${path}`;
    // this.dispatch = useCartContext();
  }

  getCartProducts = async ({ dispatch }: any) => {
    const response: any = await getApi({
      endUrl: "user/cart",
    });

    dispatch({ type: "SYNC_API", payload: response?.data?.products });
  };

  fetchHomeData = async () => {
    try {
      const response = (await getApi({
        endUrl: "home",
      })) as unknown as APIprops;
      return response?.data?.products;
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

  getHomepageData = async () => {
    const homeData: any = await getApi({
      endUrl: "get-product-parameters",
    });
    return homeData?.data;
  };

  fetchProductDetails = async (id: string) => {
    try {
      const responseData: any = await getApi({
        endUrl: `products/${id}`,
      });
      return responseData?.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  handleProductDetails = async (id: string) => {
    try {
      const responseData: any = await getApi({
        endUrl: `products/${id}`,
      });
      return responseData?.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  getAddresses = async ({ dispatch }: any) => {
    const addressData: any = await getApi({
      endUrl: `user/addresses`,
    });
    if (addressData?.status) {
      dispatch({ type: "POST_ADDRESS", payload: addressData?.data?.addresses });
    }
    return addressData?.data;
  };
}

export const ProductObject = {
  getCart: new ProductClass("cart"),
  homeData: new ProductClass("home"),
  getProductParameters: new ProductClass("get-product-parameters"),
  productsByIds: new ProductClass("products"),
  productDetails: new ProductClass("products"),
  addressFetch: new ProductClass("user/addresses"),
};

export class CartClass {
  path: string;
  constructor(path: string) {
    this.path = path;
  }

  handleAddToCart = async (
    productId: any,
    quantity: number,
    queryData: any,
    dispatch: any
  ) => {
    const res: any = await postApi({
      endUrl: "user/add-to-cart",
      data: {
        product_id: queryData?.id,
        quantity: quantity,
        size_id: queryData?.size,
        color_id: queryData?.color,
      },
    });
    // <Loader />;

    if (res?.status) {
      console.log(res);
      toast.success("Product added to Cart");
      dispatch({ type: "ADD_CART", payload: res?.data?.cart_size });
    }
  };

  handleAddToCartProduct = async (
    productId: any,
    quantity: number,
    selectedSize: any,
    selectedColor: any,
    dispatch: any
  ) => {
    const res: any = await postApi({
      endUrl: "user/add-to-cart",
      data: {
        product_id: productId,
        quantity: quantity,
        size_id: selectedSize,
        color_id: selectedColor,
      },
    });
    console.log(res, "Result");
    if (res?.status) {
      toast.success("Product added to Cart");
      dispatch({ type: "ADD_CART", payload: res?.data?.cart_size });

      //   setAddToCart(true);
    }
    return res?.data;
    // <Loader />;
  };

  handleCartData = async (dispatch: any) => {
    const getCartData: any = await getApi({
      endUrl: `user/cart`,
    });
    dispatch({ type: "ADD_PRODUCT", payload: getCartData?.data?.products });
    console.log(getCartData, "data");
  };

  handleDelete = async (
    product_id: string,
    size_id: string,
    color_id: string,
    dispatch: any
  ) => {
    try {
      await deleteApi({
        endUrl: `user/remove-from-cart`,
        data: {
          product_id,
          size_id,
          color_id,
        },
      });

      await getCartProducts({ dispatch: dispatch });
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  getProductDetails = async (id: any) => {
    const responseData: any = await getApi({
      endUrl: `products/${id}`,
    });
    return responseData?.data;
    // console.log(responseData, "response");
    // setProductDetails(responseData?.data);
  };
}

export const CartObject = {
  addToCart: new CartClass("user/add-to-cart"),
  addToCartPro: new CartClass("user/add-to-cart"),
  cartData: new CartClass("user/add-to-cart"),
  deleteCartItem: new CartClass("user/remove-from-cart"),
  checkoutPage: new CartClass(""),
};

export class OrderClass {
  path: string;
  constructor(path: string) {
    this.path = path;
  }

  postOrder = async (finalOrderData: any) => {
    const response = await postApi({
      endUrl: `user/create-order`,
      data: finalOrderData,
    });
    return response;
  };

  postAddress = async (data: PostAddressProps) => {
    const address = await postApi({
      endUrl: `user/add-address`,
      data: data,
    });
    return address;
  };
}

export const OrderObject = {
  postOrderData: new OrderClass("user/create-order"),
  postAddressData: new OrderClass("user/add-address"),
};

export class AuthClass {
  path: string;
  constructor(path: string) {
    this.path = path;
  }

  login = async ({ email, password }: any) => {
    const apiData: any = await postApi({
      endUrl: "login",
      data: { email, password },
    });
    return apiData;
  };
}

export const AuthObject = {
  login: new AuthClass("login"),
};
