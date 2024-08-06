"use-client";
import { useEffect, useState } from "react";
import { getApi } from "@/api-client/methods";
import { ProductProps } from "@/utils/interface";
import ColorPicker from "./ColorPicker";
import CustomCheckbox from "./CheckBox";

export const FilterSection = () => {
  const [handleOptions, setHandleOptions] = useState<{
    categories: string[];
    colors: string[];
  }>({
    categories: [],
    colors: [],
  });
  const [productsData, setProductsData] = useState<ProductProps>({
    categories: [],
    colors: [],
    sizes: [],
  });
  const [dropDownSelection, setDropDownSelection] = useState<string>("popular");

  const getHomepageData = async () => {
    const items: any = await getApi({
      endUrl: "get-product-parameters",
    });
    const { colors, sizes, categories } = items?.data;
    setProductsData({ colors, sizes, categories });
  };

  useEffect(() => {
    getHomepageData();
  }, []);

  const handleCategoryToggle = (category: string) => {
    setHandleOptions((prev) => {
      let newCategories;
      if (prev.categories.includes(category)) {
        newCategories = prev.categories.filter((e) => e !== category);
      } else {
        newCategories = prev.categories.concat(category);
      }

      return {
        ...prev,
        categories: newCategories,
      };
    });
  };

  const handleColorToggle = (color: string, multiSelect: boolean) => {
    setHandleOptions((prev) => {
      let newColors;
      if (multiSelect) {
        if (prev.colors.includes(color)) {
          newColors = prev.colors.filter((e) => e !== color);
        } else {
          newColors = prev.colors.concat(color);
        }
      } else {
        newColors = [color];
      }

      return {
        ...prev,
        colors: newColors,
      };
    });
  };

  const handleClear = () => {
    setHandleOptions({ categories: [], colors: [] });
  };

  // const Filters = () => {
  //   return (

  //   );
  // };

  return (
    <div>
      <div className="pr-[90px] pl-[145px] pt-[43px]">
        <div className="flex items-center">
          <div className="font-sans font-semibold text-[22px]">Filters</div>
          <div className="h-[20px]">
            <button
              className="text-[#C4C4C4] text-[14px] font-normal pl-[10px]"
              onClick={handleClear}
            >
              <u>Clear filters</u>
            </button>
          </div>
        </div>
        <div className="pt-[19px] font-sans font-bold text-[14px]">
          Categories
        </div>
        {/* <Filters /> */}
        <div className="pt-[10px] w-[190px]">
          {productsData.categories.map((category: any, index) => (
            <CustomCheckbox
              key={index}
              className={
                "border-black text-#111111 font-sans text-[13px] pt-[10px]"
              }
              placeholder={category.category_name}
              onChange={() => handleCategoryToggle(category.category_name)}
              checked={handleOptions.categories.includes(
                category.category_name
              )}
            />
          ))}
        </div>
        <div className="pt-[50px]">
          <div className="h-[87px]">
            <div className="text-[18px] font-normal font-sans text-[#979797]">
              Color
            </div>
            <div
              className={`grid grid-cols-5 gap-[10px] pt-[10px] max-w-[157px]`}
            >
              {productsData.colors.map((color: any, index) => (
                <ColorPicker
                  key={index}
                  className="w-8 h-8 mt-2"
                  initialColor={color.color_code}
                  onChange={(color) => handleColorToggle(color?.label, false)}
                  checked={handleOptions.colors.includes(color.color_code)}
                  multiSelect={false}
                  label={""}
                  value={""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
