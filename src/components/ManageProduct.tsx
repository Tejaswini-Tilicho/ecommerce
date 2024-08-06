/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from "react";
import { getApi, postApi } from "@/api-client/methods";
import CustomDropdown from "@/components/CustomDropDown";
import { AddProductProps } from "@/utils/interface";
import SingleDropdown from "@/components/SingleDropdown";
import MainButton from "@/components/button";
import Input from "@/components/Input";

interface ManageProductProps {
  mode: "Add" | "Edit";
  initialValues: any;
  id?: string;
}

const ManageProduct: React.FC<ManageProductProps> = ({
  mode,
  initialValues,
}) => {
  const [base64Files, setBase64Files] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [productDetails, setProductDetails] = useState<{
    categories: { category_id: string; category_name: string }[];
    colors: { color_id: string; color_name: string }[];
    sizes: { size_id: string; size_type: string }[];
  }>({ categories: [], colors: [], sizes: [] });

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
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);

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
      const data = await postApi({
        endUrl: "admin/add-product",
        data: inputEnter,
      });
      console.log("Product added successfully:", data);
      setButtonDisable(true);
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
    const { name, value } = e.target;
    // console.log(typeof value);
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

  return (
    <div className="bg-[#EFF2F6] h-screen pl-[145px]">
      <div className="text-[36px] font-semibold font-sans pt-[94px] text-[#000000]">
        ${mode} Products
      </div>
      <div className="flex">
        <div className="grid grid-cols-4 w-[337px] h-[341px]">
          {base64Files.map((image, index) => (
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
            buttonName={`${mode} images`}
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
              placeholder={`${mode} Name`}
              name="product_name"
              value={inputEnter.product_name}
              onChange={handleChangeValue}
            />
            <Input
              className="h-[40px] pl-[16px] py-[11.5px] bg-[#EFF2F6]"
              type={"number"}
              placeholder={`${mode} Quantity`}
              name="quantity"
              value={inputEnter.quantity}
              onChange={handleChangeValue}
            />
          </div>

          <div className="flex gap-[54px]">
            <CustomDropdown
              className="h-[40px] pl-[13px] w-full bg-[#EFF2F6]"
              placeholder={`${mode} Available Sizes`}
              options={getSizeOptions()}
              multiple={true}
              value={inputEnter.size_ids}
              name="size_ids"
              onChange={(value) => handleDropdownChange("size_ids", value)}
            />
            <Input
              className="h-[40px] pl-[16px] py-[11.5px] bg-[#EFF2F6]"
              type={"number"}
              placeholder={`${mode} Price`}
              name="price"
              value={inputEnter.price}
              onChange={handleChangeValue}
            />
          </div>

          <div className="flex gap-[54px]">
            <CustomDropdown
              className="h-[40px] pl-[13px] w-full bg-[#EFF2F6]"
              placeholder={`${mode} Colors`}
              options={getColorOptions()}
              multiple={true}
              value={inputEnter.color_ids}
              name="color_ids"
              onChange={(value) => handleDropdownChange("color_ids", value)}
            />
            <SingleDropdown
              className="h-[40px] pl-[13px] w-full bg-[#EFF2F6]"
              placeholder={`${mode} Categories`}
              options={getCategoryOptions()}
              value={inputEnter.category_id}
              // name="category_id"
              onChange={(value) => handleDropdownChange("category_id", value)}
            />
          </div>
          <Input
            className="h-[120px] pl-[16px] py-[11.5px] bg-[#EFF2F6]"
            type={"text"}
            placeholder={`${mode} Description`}
            name="description"
            value={inputEnter.description}
            onChange={handleChangeValue}
          />
        </div>
      </div>
      <div className="flex mt-[90px]">
        {/* <MainButton
          className={
            "bg-[#0D0D0D] text-[#FFFFFF] text-[16px] font-semibold ml-[386px]"
          }
          buttonName={"Add"}
          onClick={handleAddClick}
          width={"149px"}
          height={"50px"}
        /> */}
        <MainButton
          className={`bg-[#0D0D0D] text-[#FFFFFF] text-[16px] font-semibold ml-[386px] ${
            buttonDisable ? "opacity-50 cursor-not-allowed" : ""
          }`}
          buttonName={`${mode}`}
          onClick={handleAddClick}
          width={"149px"}
          height={"50px"}
          disabled={buttonDisable}
        />
        <MainButton
          className={`bg-[#0D0D0D] text-[#FFFFFF] text-[16px] font-semibold ml-[66px]`}
          buttonName={"Back"}
          onClick={() => {}}
          width={"149px"}
          height={"50px"}
        />
      </div>
    </div>
  );
};

export default ManageProduct;
