import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import fav from "../../../../public/images/fav.svg";
import group from "../../../../public/images/Group.svg";
import { useRouter } from "next/router";
import { useCartContext } from "@/context/context";
import { getApi, postApi } from "@/api-client/methods";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import ImageGrid from "@/components/MultipleProductImages";
import ColorPicker from "@/components/ColorPicker";
import Counter from "@/components/Quantity";
import MainButton from "@/components/button";
import SizePicker from "@/components/SizePicker";

const Product: React.FC = () => {
  const { state, dispatch } = useCartContext();
  const router = useRouter();
  const { id: productId } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | any>(null);
  const [sizeType, setSizeType] = useState<any>(null);
  // const [AddCartData, setAddCartData] = useState<any>(null);
  const [addToCart, setAddToCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    // console.log(productId);

    if (productId) {
      fetchProductDetails(productId as string);
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      if (!selectedColor && product?.colors?.length > 1) {
        setSelectedColor(product.colors[0].color_id);
      }
      if (!selectedSize && product?.sizes?.length > 1) {
        setSelectedSize(product.sizes[0].size_id);
        setSizeType(product?.sizes[0].size_type);
      }
    }
  }, [product]);
  // console.log(product, "product");
  console.log(state, "state");
  const fetchProductDetails = async (id: string) => {
    // console.log("asxc");
    try {
      const responseData: any = await getApi({
        endUrl: `products/${id}`,
      });
      <Loader />;
      setProduct(responseData?.data);
      setSelectedColor(responseData?.data?.colors[0]?.color_id);
      // console.log(responseData);
      // console.log(product?.quantity, "zsdfg");
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleImageClick = () => {
    // console.log(selectedSize,'size')
    // console.log(quantity, selectedSize, "qury", product?.category?.category_id);
    router.push({
      pathname: `/Home/${product?.product_id}/${product?.category?.category_id}`,
      query: {
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
        sizeLabel: sizeType,
      },
    });
    <Loader />;
    // router.push(
    //   `/Home/${product?.product_id}/${product?.category}?quantity=${quantity}&size=${selectedSize}`
    // );
  };
  // console.log(quantity, "quan");

  const handleAddToCart = async (productId: any, quantity: number) => {
    // console.log(selectedColor);
    const res: any = await postApi({
      endUrl: "user/add-to-cart",
      data: {
        product_id: productId,
        quantity: quantity,
        size_id: selectedSize,
        color_id: selectedColor,
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

  const handleSizeChange = (size: {
    size_id(size_id: any): unknown;
    size_type(size_type: any): unknown;
    label: string;
    value: string;
  }) => {
    console.log(size, "size");
    // console.log(size.label)
    // console.log(size.label, "sizeVal");
    setSizeType(size.size_type);
    setSelectedSize(size.size_id);
    // console.log(selectedSize,'select')
  };

  const handleColorChange = (color: string) => {
    // console.log(color, "color");
    setSelectedColor(color);
  };

  // console.log(product?.quantity, "productQuan");
  // console.log(selectedSize, "sizeSelect");
  // console.log(sizeType, "sizeType");
  return (
    <div className="pt-[135px] h-screen pr-[110px]">
      <div className="px-[7%]">
        <div className="flex gap-10">
          <div className="w-[50%]">
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
                onClick={() => handleAddToCart(productId, quantity)}
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
