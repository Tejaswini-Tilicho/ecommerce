/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from "react";
import { getApi, postApi, putApi } from "@/api-client/methods";
import CustomDropdown from "@/components/CustomDropDown";
import { AddProductProps } from "@/utils/interface";
import SingleDropdown from "@/components/SingleDropdown";
import MainButton from "@/components/button";
import Input from "@/components/Input";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const EditProducts: React.FC = () => {
  const router = useRouter();
  //   console.log(router.query, "query");
  const { id } = router.query;
  //   console.log(id, "query");
  const [base64Files, setBase64Files] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [productDetails, setProductDetails] = useState<{
    categories: { category_id: string; category_name: string }[];
    colors: { color_id: string; color_name: string }[];
    sizes: { size_id: string; size_type: string }[];
  }>({ categories: [], colors: [], sizes: [] });
  const accessToken = localStorage.getItem("accessToken");
  const [productData, setProductData] = useState<any>({});

  //   console.log(productData, "proData");
  const images = productData?.images;

  const [inputEnter, setInputEnter] = useState<AddProductProps>({
    product_name: "",
    category_id: "",
    color_ids: [],
    description: "",
    images: [],
    price: 0,
    quantity: 0,
    size_ids: [],
  });

  useEffect(() => {
    const getProduct = async (id: string) => {
      const response: any = await getApi({
        endUrl: `products/${id}`,
        headers: `Bearer ${accessToken}`,
      });
      console.log(response, "res");
      //   setProductData(response?.data);
      //   getProduct(id as string);
      setProductData(response?.data);
      setInputEnter({
        product_name: response?.data.product_name,
        category_id: response?.data.category_id,
        color_ids: response?.data.color_ids,
        description: response?.data.description,
        images: response?.data.images,
        price: response?.data.price,
        quantity: response?.data.quantity,
        size_ids: response?.data.size_ids,
      });
    };
    if (id) getProduct(id as string);
  }, [id, accessToken]);

  //   const inputData = productData;

  //   console.log(inputEnter, "Enter");

  const [buttonDisable, setButtonDisable] = useState<boolean>(false);

  //   const UpdateData = async (id: any) => {
  //     const responseData = await putApi({
  //       endUrl: `admin/edit-product/${id}`,
  //       headers: `Bearer${accessToken}`,
  //       data: inputData,
  //     });
  //   };

  const UpdateData = async (id: any) => {
    try {
      const responseData: any = await putApi({
        endUrl: `admin/edit-product/${id}`,
        headers: `Bearer ${accessToken}`,
        data: inputEnter,
      });
      if (responseData?.status) {
        toast.success(responseData?.message);
        router.push("/AdminHome");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      const newBase64Files = await convertFilesArrayToBase64(filesArray);

      setBase64Files((prevBase64Files) => [
        ...prevBase64Files,
        ...newBase64Files,
      ]);

      setInputEnter((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...newBase64Files],
      }));
    }
  };
  //   console.log(inputEnter, "ipenter");

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const convertFilesArrayToBase64 = async (
    files: File[]
  ): Promise<string[]> => {
    const base64Files: string[] = [];
    for (const file of files) {
      const base64File = await convertFileToBase64(file);
      base64Files.push(base64File);
    }
    return base64Files;
  };

  const handleAddClick = async () => {
    try {
      const data: any = await postApi({
        endUrl: "admin/add-product",
        data: inputEnter,
      });
      // console.log("Product added successfully:", data);
      // console.log(data, "data");
      if (data?.status) {
        toast.success(data?.message);
        setButtonDisable(true);
      }
    } catch (error) {
      console.error("Error adding product:");
    }
  };

  const handleGetData = async () => {
    const getData: any = await getApi({
      endUrl: "get-product-parameters",
    });

    if (getData) {
      const { colors, sizes, categories } = getData.data;
      setProductDetails({
        colors,
        sizes,
        categories,
      });
    } else {
      console.log("Failed to fetch data");
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleChangeValue = (e: any) => {
    // console.log(e.target.value, "trfy");
    const { name, value } = e.target;
    // console.log(name, "nameTYUI");
    setInputEnter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name: string, value: string | string[]) => {
    setInputEnter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getColorOptions = () =>
    productDetails.colors.map((item) => ({
      label: item.color_name,
      value: item.color_id,
    }));

  const getSizeOptions = () =>
    productDetails.sizes.map((item) => ({
      label: item.size_type,
      value: item.size_id,
    }));

  const getCategoryOptions = () =>
    productDetails.categories.map((item) => ({
      label: item.category_name,
      value: item.category_id,
    }));

  const handleRemoveImage = (index: number) => {
    const updatedBase64Files = base64Files.filter((_, i) => i !== index);
    setBase64Files(updatedBase64Files);
    setInputEnter((prevState) => ({
      ...prevState,
      images: updatedBase64Files,
    }));
  };
  console.log(inputEnter?.product_name, "enter");

  return (
    <div className="bg-[#EFF2F6] h-screen pl-[145px]">
      <div className="text-[36px] font-semibold font-sans pt-[94px] text-[#000000]">
        Edit Product
      </div>
      <div className="flex">
        <div className="grid grid-cols-4 w-[337px] overflow-y-auto h-[341px] mt-[90px]">
          {images?.map((image: any, index: any) => (
            <div
              key={index}
              className="relative mt-[77px] w-full h-full border"
            >
              <img
                className="absolute object-cover w-full h-full"
                src={image}
                alt={`Image ${index}`}
              />
              <button
                className="absolute top-2 right-2 font-semibold bg-[#000000] text-[#FFFFFF] rounded-full w-4 h-4 flex items-center justify-center"
                onClick={() => handleRemoveImage(index)}
              >
                &times;
              </button>
            </div>
          ))}

          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="file"
              name="file"
              ref={inputRef}
              className="hidden"
              multiple
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg"
            />
          </form>
          <MainButton
            buttonName="Add images"
            onClick={() => inputRef.current?.click()}
            className="absolute border border-black left-[252px] top-[650px]"
            width="124px"
            height="50px"
          />
        </div>
        <div className="flex-col gap-[24px] flex ml-[42px] mt-[94px] w-[60%] mr-[262px]">
          <div className="flex gap-[54px]">
            <Input
              className="h-[40px] pl-[16px] py-[11.5px] bg-[#EFF2F6]"
              type={"text"}
              //   placeholder={productData?.product_name}
              name="product_name"
              value={inputEnter?.product_name}
              min={5}
              max={25}
              onChange={handleChangeValue}
            />
            <Input
              className="h-[40px] pl-[16px] py-[11.5px] bg-[#EFF2F6]"
              type={"number"}
              //   placeholder={productData?.quantity}
              name="quantity"
              value={inputEnter.quantity}
              onChange={handleChangeValue}
              min={1}
              max={4}
            />
          </div>

          <div className="flex gap-[54px]">
            <CustomDropdown
              className="h-[40px] pl-[13px] w-full bg-[#EFF2F6]"
              placeholder={"Edit sizes"}
              options={getSizeOptions()}
              multiple={true}
              value={productData?.size_ids}
              name="size_ids"
              onChange={(value) => handleDropdownChange("size_ids", value)}
            />
            <Input
              className="h-[40px] pl-[16px] py-[11.5px] bg-[#EFF2F6]"
              type={"number"}
              placeholder={productData?.price}
              name="price"
              value={inputEnter.price}
              onChange={handleChangeValue}
              min={1}
              max={3}
            />
          </div>

          <div className="flex gap-[54px]">
            <CustomDropdown
              className="h-[40px] pl-[13px] w-full bg-[#EFF2F6]"
              placeholder={"Edit Colors"}
              options={getColorOptions()}
              multiple={true}
              value={productData.color_ids}
              name="color_ids"
              onChange={(value) => handleDropdownChange("color_ids", value)}
            />
            <SingleDropdown
              className="h-[40px] pl-[13px] w-full text-[#A9ABBD] bg-[#EFF2F6]"
              placeholder={"Edit Categories"}
              options={getCategoryOptions()}
              value={productData?.category_id}
              // name="category_id"
              onChange={(value) => handleDropdownChange("category_id", value)}
            />
          </div>
          <Input
            className="h-[120px] pl-[16px] py-[11.5px] bg-[#EFF2F6]"
            type={"text"}
            placeholder={productData?.description}
            name="description"
            value={productData?.description}
            onChange={handleChangeValue}
            min={10}
            max={500}
          />
        </div>
      </div>
      <div className="flex mt-[90px] ml-[150px]">
        <MainButton
          className={`bg-[#0D0D0D] text-[#FFFFFF] text-[16px] font-semibold ml-[386px] ${
            buttonDisable ? "opacity-50 cursor-not-allowed" : ""
          }`}
          buttonName={"Edit"}
          onClick={() => UpdateData(id)}
          width={"149px"}
          height={"50px"}
          disabled={buttonDisable}
        />
        <MainButton
          className={`bg-[#0D0D0D] text-[#FFFFFF] text-[16px] font-semibold ml-[66px]`}
          buttonName={"Back"}
          onClick={() => router.push("/AdminHome")}
          width={"149px"}
          height={"50px"}
        />
      </div>
    </div>
  );
};

export default EditProducts;
