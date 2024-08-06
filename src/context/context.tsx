import { getApi } from "@/api-client/methods";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
interface CartProps {
  cartCount: number;
  productIds: string[];
}
interface CartDetailsProps {
  cart: CartProps;
  dispatch: Dispatch<ActionProps>;
}
interface ActionProps {
  type:
    | "ADD_CART"
    | "SYNC_API"
    | "POST_ADDRESS"
    | "SET_CURRENT_ADDRESS"
    | "SINGLE_PRODUCT_DETAILS"
    | "SHIPPING_TYPE"
    | "ADD_PRODUCT"
    | "ADMIN_PRODUCTS"
    | "SET_SELECTED_ADDRESS";
  payload: string | string[];
}
const intialState = {
  cart: { cartCount: 0, productIds: [], loader: false },
  singleproduct: { productDetails: {} },
  checkout: {
    address: { addresses: [], currentAddress: {}, selectedId: "" },
    shipping: { shippingType: "" },
    payment: {},
  },
  adminProducts: {},
  loader: false,
};
const cartReducer = (state: any, action: ActionProps) => {
  switch (action.type) {
    case "ADD_CART":
      // console.log(action, "inside action");
      return {
        ...state,
        cart: {
          ...state.cart,
          cartCount: action.payload,
          //   productIds: action.payload,
        },
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        cart: {
          ...state.cart,
          productIds: action.payload,
        },
      };
    case "SYNC_API":
      return {
        ...state,
        cart: {
          cartCount: action.payload?.length,
          productIds: action.payload,
        },
      };

    case "POST_ADDRESS":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          address: {
            ...state.checkout.address,
            addresses: action.payload,
          },
        },
      };

    case "SET_CURRENT_ADDRESS":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          address: {
            ...state.checkout.address,
            currentAddress: action.payload,
          },
        },
      };

    case "SHIPPING_TYPE":
      return {
        ...state,
        checkout: {
          ...state?.checkout,
          shipping: {
            ...state?.checkout?.shipping,
            shippingType: action.payload,
          },
        },
      };

    case "SINGLE_PRODUCT_DETAILS":
      return {
        ...state,
        singleproduct: {
          ...state.singleproduct,
          productDetails: action.payload,
        },
      };

    case "ADMIN_PRODUCTS":
      return {
        ...state,
        adminProducts: action.payload,
      };

    case "SET_SELECTED_ADDRESS":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          address: {
            ...state.checkout.address,
            selectedId: action.payload,
          },
        },
      };

    default:
      return state;
  }
};
const CartContext = createContext<any>(null);
interface CartProviderProps {
  children: ReactNode;
}
const handleData = (data: any[]) => {
  if (data.length > 0) {
    return data?.map((item) => item?.product_id);
  } else {
    return [];
  }
};

export default function CartContextProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, intialState);
  const getCartProducts = async () => {
    const response: any = await getApi({
      endUrl: "user/cart",
    });
    const product_ids = handleData(response?.data || []);
    // console.log(response.data.products, "peof");
    dispatch({ type: "SYNC_API", payload: response?.data?.products });
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <div>
      <CartContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
}
export function useCartContext() {
  const context = useContext(CartContext);
  // console.log(context);
  if (context === undefined) {
    throw new Error(
      "useClipBoard must be used within a ConceptsContextProvider"
    );
  }
  return context;
}
