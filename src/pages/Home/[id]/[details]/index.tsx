/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Public_Sans } from "next/font/google";
import { useCartContext } from "@/context/context";
import { useRouter } from "next/router";
import { getApi, postApi } from "@/api-client/methods";
import SingleDropdown from "@/components/SingleDropdown";
import { toast } from "react-toastify";
import MainButton from "@/components/Button";
import Loader from "@/components/Loader";
import Carousel from "@/components/Carousel";
import Counter from "@/components/Quantity";

const publicSans = Public_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const ProductInfo: React.FC = () => {
  const { state, dispatch } = useCartContext();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [productSize, setProductSize] = useState<string | null>(null);
  const [productColor, setProductColor] = useState<string | null>(null);
  const [addToCart, setAddToCart] = useState<boolean>(false);
  // const [count, setCount] = useState(1);

  // const {
  //   id: productId,
  //   quantity: quantityNumber,
  //   size: sizeFromQuery,
  //   color: colorFromQuery,
  // } = router.query;
  const queryData = router.query;
  console.log(queryData?.sizeLabel, "sizelabel");
  const [sizeLabel, setSizelabel] = useState<string | null>(
    queryData?.sizeLabel as string
  );

  // console.log(router.query, "router");
  const [count, setCount] = useState<number>(Number(queryData?.quantity));
  console.log(count, "quan");

  // console.log(queryData, "query");
  // console.log(data, "data");
  // console.log(state, "single");

  useEffect(() => {
    // console.log(queryData, "sdfg");
    if (queryData?.id) {
      handleProductDetails(queryData?.id as string);
    }
  }, [router.query]);
  // console.log(productId)
  console.log(queryData, "sizecome");
  // useEffect(() => {
  //   if (selectSize) {
  //     const selectedOption = options.find(
  //       (option) => option.value === selectSize
  //     );
  //     if (selectedOption) {
  //       setSelectedPlaceholder(selectedOption.label);
  //     }
  //   }
  // }, [selectSize, options]);

  const handleProductDetails = async (id: string) => {
    try {
      const responseData: any = await getApi({
        endUrl: `products/${id}`,
      });
      <Loader />;
      setData(responseData?.data);
      // console.log(responseData?.data, "responseData");
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // const handleSizeChange = (size: { label: string; value: string }) => {
  //   setProductSize(size.value);
  // };

  const handleSizeChange = (size: { label: string; value: string }) => {
    console.log(size, "sizeChange");
    setProductSize(size?.value);
    setSizelabel(size?.label);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, size: size.value },
    });
  };
  console.log(productSize, "size");
  // console.log(queryData, "query");
  // console.log(count, "count");
  const handleAddToCart = async (productId: any, quantity: number) => {
    // console.log(selectedColor);
    const res: any = await postApi({
      endUrl: "user/add-to-cart",
      data: {
        product_id: queryData?.id,
        quantity: count,
        size_id: queryData?.size,
        color_id: queryData?.color,
      },
    });
    <Loader />;
    // setAddCartData(res);
    // console.log(res, "sdfg");
    if (res?.status) {
      toast.success("Product added to Cart");
      setAddToCart(true);
      dispatch({ type: "ADD_CART", payload: res?.data?.cart_size });
    }
  };
  // console.log(quantityNumber, sizeFromQuery, "fgh");

  const handleBuyNow = () => {
    router.push({
      pathname: "/checkout",
      query: {
        product_name: data?.product_name,
        size: sizeLabel,
        quantity: count,
        buyNow: true,
        product_id: data?.product_id,
      },
    });
    dispatch({
      type: "SINGLE_PRODUCT_DETAILS",
      payload: {
        quantity: count,
        price: data?.price,
        size: queryData?.size,
        product_id: data?.product_id,
        color_id: queryData?.color,
      },
    });
  };

  return (
    <div className="bg-[#EFF2F6] h-[100%]">
      <div className="ml-[110px] pt-[147px] pb-[204px] flex">
        <div className="w-[50%]">
          <Carousel images={data?.images} />
        </div>

        <div className="flex-col pl-[96px] w-[50%]">
          <div className="font-sans pr-1 font-semibold text-[36px]">
            {data?.product_name}
          </div>
          <div className="font-sans font-normal text-[24px] text-[#000000]">
            ${data?.price}
          </div>
          <div className="font-sans font-normal text-[18px] w-[357px] pt-[22px]">
            {data?.description}
          </div>
          <div className="flex pt-[15px] space-x-4">
            <Counter
              width="167px"
              height="50px"
              quantity={count}
              setQuantity={setCount}
              max={0}
              onIncrement={() => {
                if (count < data?.quantity) {
                  setCount(count + 1);
                }
              }}
              onDecrement={() => {
                if (count > 1) {
                  setCount(count - 1);
                }
              }}
            />

            <SingleDropdown
              className="w-[168px] h-[50px] text-[#000] pl-[16px] py-[12px]"
              options={
                data?.sizes.map((size: any) => ({
                  label: size.size_type,
                  value: size.size_id,
                })) ?? []
              }
              // placeholder={queryData?.sizeLabel as string}
              onChange={handleSizeChange}
              selectSize={queryData?.sizeLabel as string}
              value={queryData.size as string}
            />
          </div>
          <div className="pt-[16px] text-[#979797] font-inter font-normal text-[14px] w-[350px]">
            Height of model: 189 cm./6&#39;2&#34; Size 41
          </div>
          <div className="flex items-center pt-[23px] space-x-4">
            <MainButton
              className="bg-[#0D0D0D] text-[#FFFFFF] font-sans font-semibold text-[16px] flex items-center justify-center"
              buttonName={`Add to Cart - $${data?.price * count}`}
              onClick={() => handleAddToCart(data?.product_id, 1)}
              width="198px"
              height="50px"
            />
            <MainButton
              className="bg-[#2F80ED] text-[#FFFFFF] font-sans font-semibold text-[16px] flex items-center justify-center"
              buttonName="Buy Now"
              onClick={handleBuyNow}
              width="139px"
              height="50px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
