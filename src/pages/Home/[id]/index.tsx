import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import fav from "../../../../public/images/fav.svg";
import group from "../../../../public/images/Group.svg";
import { useRouter } from "next/router";
import { useCartContext } from "@/context/context";
import Loader from "@/components/Loader";
import ImageGrid from "@/components/MultipleProductImages";
import ColorPicker from "@/components/ColorPicker";
import Counter from "@/components/Quantity";
import MainButton from "@/components/Button";
import SizePicker from "@/components/SizePicker";
import useSWR from "swr";
import { CartObject, ProductObject } from "@/api-classes/apis";

const Product: React.FC = () => {
  const { state, dispatch } = useCartContext();
  const router = useRouter();
  const queryData = router.query;
  const { id: productId } = router.query;
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | any>(null);
  const [sizeType, setSizeType] = useState<any>(null);
  const [addToCart, setAddToCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const fetcher = async (id: string) => {
    return ProductObject.productsByIds.fetchProductDetails(id);
  };

  const { data: product, isLoading: productLoading } = useSWR(
    productId ? `products/${productId}` : null,
    () => fetcher(productId as string)
  );
  // console.log(product, "Product");

  useEffect(() => {
    if (product) {
      if (!selectedColor && product?.colors?.length >= 1) {
        setSelectedColor(product.colors[0].color_id);
      }
      if (!selectedSize && product?.sizes?.length > 1) {
        setSelectedSize(product.sizes[0].size_id);
        setSizeType(product?.sizes[0].size_type);
      }
    }
  }, [product, selectedColor, selectedSize]);

  const handleImageClick = () => {
    router.push({
      pathname: `/home/${product?.product_id}/${product?.category?.category_id}`,
      query: {
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
        sizeLabel: sizeType,
      },
    });
    <Loader />;
  };

  if (productLoading) return <Loader />;

  const cartAdder = async (
    id: any,
    quantity: number,
    selectedSize: any,
    selectedColor: any,
    dispatch: any
  ) => {
    let res: any = await CartObject.addToCart.handleAddToCartProduct(
      id,
      quantity,
      selectedSize,
      selectedColor,
      dispatch
    );
    // console.log(res, "Result");
    // dispatch({ type: "ADD_CART", payload: res?.data?.cart_size });
    return res;
  };

  const handleSizeChange = (size: {
    size_id(size_id: any): unknown;
    size_type(size_type: any): unknown;
    label: string;
    value: string;
  }) => {
    console.log(size, "size");
    setSizeType(size.size_type);
    setSelectedSize(size.size_id);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="pt-[135px] h-screen pr-[110px]">
      <div className="px-[7%]">
        <div className="flex gap-10">
          <div className="w-[50%] cursor-pointer">
            <ImageGrid images={product?.images} onClick={handleImageClick} />
          </div>
          <div className="flex pl-[76px] flex-col w-[50%]">
            <div className="flex justify-start">
              <div className="flex items-center space-x-4">
                <div className="font-sans pr-1 font-semibold text-[36px]">
                  {product?.product_name}
                </div>
                <NextImage
                  className="w-[28.89px] h-[25.84px]"
                  src={fav}
                  alt={"Image not found"}
                />
                <NextImage
                  className="w-[32px] h-[32px]"
                  src={group}
                  alt={"Image not found"}
                />
              </div>
            </div>
            <div className="flex">
              <div className="font-sans font-normal w-[46px] text-[18px]">
                ${product?.price}
              </div>
              <div className="border border-[#C4C4C4] w-[330px] h-[28px] flex items-center justify-center">
                <div className="font-sans px-[11px] font-normal text-[13px] ">
                  or 4 interest-free payments of $
                  {(product?.price / 4).toFixed(2)}. <u>Learn more</u>
                </div>
              </div>
            </div>
            <div className="font-sans font-normal text-[18px] w-[357px] pt-[22px]">
              {product?.description}
            </div>
            <div className="font-sans pt-[7px] text-[#979797] font-normal text-[18px]">
              Color
            </div>
            <div className="grid grid-cols-5 gap-[10px] pt-[10px] max-w-[157px]">
              {/* <ColorPicker
                availableColors={
                  product?.colors?.map((color: any) => ({
                    label: color.color_code,
                    value: color.color_id,
                  })) ?? []
                }
                onChange={handleColorChange}
              /> */}
              {product?.colors.map((color: any, index: any) => (
                <ColorPicker
                  key={index}
                  label={color?.color_code}
                  value={color?.color_id}
                  checked={selectedColor === color?.color_id}
                  // availableColors={[
                  //   {
                  //     label: color.color_code,
                  //     value: color.color_id,
                  //   },
                  // ]}
                  onChange={() => handleColorChange(color?.color_id)}
                />
              ))}
            </div>
            <div className="pt-[11px]">
              <div className="font-sans pb-[11px] text-[#979797] font-normal text-[18px]">
                Size
              </div>
              {/* <Sizepicker
                // availableSizes={
                //   product?.sizes?.map((size: any) => ({
                //     label: size.size_type,
                //     value: size.size_id,
                //   })) ?? []
                // }
                label = size?.size_type
                onChange={handleSizeChange}
              /> */}
              <div className="flex">
                {product?.sizes.map((size: any, index: any) => (
                  <SizePicker
                    key={index}
                    label={size?.size_type}
                    value={size?.size_id}
                    checked={selectedSize === size?.size_id}
                    // availableColors={[
                    //   {
                    //     label: color.color_code,
                    //     value: color.color_id,
                    //   },
                    // ]}
                    onChange={() => handleSizeChange(size)}
                  />
                ))}
              </div>
            </div>
            <div className="pt-[27px] font-sans font-normal text-[13px] text-[#000000]">
              <u>Size & Fit Guide</u>
            </div>
            <div className="pt-[12px] pb-[18px] text-[#979797] font-inter font-normal text-[14px] w-[350px]">
              Height of model: 189 cm./6&#39;2&#34; Size 41
            </div>
            <div className="flex items-center space-x-4">
              <MainButton
                className="bg-[#0D0D0D] text-[#FFFFFF] font-sans font-semibold text-[16px] flex items-center justify-center"
                buttonName={`Add to Cart-$${product?.price * quantity}`}
                onClick={() =>
                  cartAdder(
                    productId,
                    quantity,
                    selectedSize,
                    selectedColor,
                    dispatch
                  )
                }
                width="350px"
                height="50px"
              />
              <div className="relative">
                <div className="font-sans font-normal text-[18px] text-[#979797] absolute top-[-35px] left-[5px]">
                  Quantity
                </div>

                <Counter
                  width="100px"
                  quantity={quantity}
                  setQuantity={setQuantity}
                  // max={product?.quantity}
                  onIncrement={() => {
                    // console.log("ijdiw");
                    if (quantity < product.quantity) {
                      setQuantity(quantity + 1);
                    }
                  }}
                  onDecrement={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                    // console.log("decrement");
                  }}
                  max={quantity}
                />
              </div>
            </div>
            <div className="flex pt-[12px]">
              <div className="font-inter font-normal text-[14px] text-[#979797]">
                Free Standard Shipping
              </div>
              <div className="font-inter pl-[14px] font-normal text-[14px] text-[#979797]">
                <u>Free Returns</u>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
