import { useEffect } from "react";
import OrderSummary from "../../components/OrderSummary";
import OrderInfo from "@/components/OrderInfo";
import { deleteApi, getApi } from "@/api-client/methods";
import { getCartProducts, postCartData } from "@/utils/common/common.api";
import { useCartContext } from "@/context/context";
import Cart from "@/components/Cart";
import Link from "next/link";

const CartScreen = () => {
  // const [cartData, setCartData] = useState<any>({ products: [] });
  const { state, dispatch } = useCartContext();
  console.log(state, "cart");

  useEffect(() => {
    handleCartData();
  }, []);

  const handleCartData = async () => {
    const getCartData: any = await getApi({
      endUrl: `user/cart`,
    });
    dispatch({ type: "ADD_PRODUCT", payload: getCartData?.data?.products });
    console.log(getCartData, "data");
    // setCartData(getCartData?.data || { products: [] });
    // console.log(cartData, "cart");
  };

  const handleDelete = async (
    product_id: string,
    size_id: string,
    color_id: string
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

      // setCartData((prevData: any) => ({
      //   ...prevData,
      //   products: prevData.products.filter(
      //     (item: any) =>
      //       item.product_id !== product_id ||
      //       item.size.size_id !== size_id ||
      //       item.color.color_id !== color_id
      //   ),
      // }));
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  return (
    <div className="bg-[#EFF2F6] h-[100%] mt-[60px] ml-[141px]">
      <div className="flex">
        <div className="flex flex-col w-[60%]">
          <div className="font-sans text-[#000000] font-semibold text-[36px] pt-[51px]">
            Your Cart
          </div>

          <div className="font-sans font-medium text-[16px] text-[#000000] pt-[11px]">
            Not ready to checkout?{" "}
            <u>
              <Link href="/home">Continue Shopping</Link>
            </u>
          </div>

          <div>
            {state?.cart?.productIds?.length > 0 ? (
              state?.cart?.productIds
                .sort((a: any, b: any) =>
                  a.product_id.localeCompare(b.product_id)
                )
                .map((item: any, index: any) => (
                  <div key={index}>
                    <Cart
                      image={item?.images[0]}
                      text={item?.product_name}
                      size={item.size?.size_type}
                      quantity={item?.quantity}
                      cost={item?.price ? `$${item?.price}` : "$0"}
                      onRemove={() =>
                        handleDelete(
                          item?.product_id,
                          item?.size.size_id,
                          item?.color.color_id
                        )
                      }
                      onIncrement={async () => {
                        await postCartData({
                          product_id: item?.product_id,
                          size_id: item?.size?.size_id,
                          color_id: item?.color?.color_id,
                          quantity: 1,
                        });
                        await getCartProducts({ dispatch: dispatch });
                      }}
                      onDecrement={async () => {
                        await postCartData({
                          product_id: item?.product_id,
                          size_id: item?.size?.size_id,
                          color_id: item?.color?.color_id,
                          quantity: -1,
                        });
                        await getCartProducts({ dispatch: dispatch });
                      }}
                    />
                    {index < state?.cart?.productIds.length - 1 && (
                      <div className="border-[1px] border-[#909090] border-solid w-full my-[17px]"></div>
                    )}
                  </div>
                ))
            ) : (
              <div className="font-sans text-[#000000] font-medium text-[18px] pt-[20px]">
                Your cart is empty.
              </div>
            )}
          </div>
          <div className="">
            <OrderInfo />
          </div>
        </div>
        <div className="sticky top-5 ml-[87px] w-[40%] h-[252px] mr-[206px] mt-[55px]">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
