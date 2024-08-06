/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getApi } from "@/api-client/methods";
import { LIMIT } from "@/utils/constants";
import { getProductsData, ProductProps } from "@/utils/interface";
import Loader from "@/components/Loader";
import CustomCheckbox from "@/components/CheckBox";
import ColorPicker from "@/components/ColorPicker";
import Dropdown from "@/components/DropDown";
import ShopItem from "@/components/ShopItem";
import MainButton from "@/components/button";

const HomePage = () => {
  const options = [
    { label: "Popular", value: "rating" },
    { label: "Recent", value: "recent" },
    { label: "Price", value: "price" },
  ];

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

  const [dropDownSelection, setDropDownSelection] = useState<string>("rating");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [items, setItems] = useState<getProductsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsInfo, setProductsInfo] = useState();
  // const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    getProductDetails();
  }, [pageNumber, dropDownSelection, handleOptions]);

  // useEffect(() => {
  //   getProductDetails();
  // }, [dropDownSelection]);

  // useEffect(() => {
  //   getProductDetails();
  // }, [handleOptions]);

  useEffect(() => {
    getHomepageData();
  }, []);

  const handleQuery = (type: string, array: string[]) => {
    const resultString = array.map((item) => `${type}=${item}`).join("&");
    return resultString;
  };

  const getProductDetails = async () => {
    setLoading(true);
    const getProductsData: any = await getApi({
      endUrl: `list-products?page=${pageNumber}&limit=${LIMIT}&sort_by=${dropDownSelection}&${handleQuery(
        "category_id",
        handleOptions.categories
      )}&${handleQuery("color_id", handleOptions.colors)}`,
    });
    // console.log(getProductsData, "getProducts");
    setProductsInfo(getProductsData?.data);
    // console.log(productsInfo,'ind');
    if (getProductsData) {
      setItems((prev) => [...prev, ...getProductsData?.data?.products]);
      setTotalProducts(getProductsData?.data?.total_productss);
      setLoading(false);
      setHasMoreProducts(
        items.length + getProductsData?.data?.products.length <
          getProductsData?.data?.total_productss
      );
    } else {
      setHasMoreProducts(false);
    }
  };

  const getHomepageData = async () => {
    setLoading(true);
    const homeData: any = await getApi({
      endUrl: "get-product-parameters",
    });
    // console.log(homeData, "home");
    if (homeData) {
      const { colors = [], sizes = [], categories = [] } = homeData?.data || {};
      setProductsData({ colors, sizes, categories });
      setLoading(false);
      // let accessToken = homeData?.data?.accessToken;
      // localStorage.setItem("accessToken", accessToken);
    }
  };

  const handleCategoryToggle = (category: string) => {
    setItems([]);
    setPageNumber(1);
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

  const handleColorToggle = (color: string) => {
    setItems([]);
    setPageNumber(1);
    setHandleOptions((prev) => {
      let newColors;
      if (prev.colors.includes(color)) {
        newColors = prev.colors.filter((e) => e !== color);
      } else {
        newColors = prev.colors.concat(color);
      }

      return {
        ...prev,
        colors: newColors,
      };
    });
  };

  const handleInput = (value: string) => {
    // console.log(value);
    setDropDownSelection(value);
    setItems([]);
  };
  // console.log(totalProducts, "total");
  const handlePages = () => {
    setLoading(true);
    setPageNumber(pageNumber + 1);
  };

  const handleClear = () => {
    setPageNumber(1);
    setItems([]);
    setHandleOptions({ categories: [], colors: [] });
  };

  return (
    <div className="h-full pt-[31px] pr-[110px]">
      <div className="flex">
        <div className="sticky top-5">
          <div className="sticky top-10">
            <div className="pr-[90px] pl-[145px] pt-[43px]">
              <div className="flex items-center">
                <div className="font-sans font-semibold text-[22px]">
                  Filters
                </div>
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
              <div className="pt-[10px] w-[190px]">
                {productsData.categories.map((category: any, index) => (
                  <CustomCheckbox
                    key={index}
                    className={
                      "border-black text-#111111 font-sans text-[13px] pt-[10px]"
                    }
                    placeholder={category.category_name}
                    onChange={() => handleCategoryToggle(category.category_id)}
                    checked={handleOptions.categories.includes(
                      category.category_id
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
                        label={color?.color_code}
                        value={color?.color_id}
                        checked={handleOptions.colors.includes(color.color_id)}
                        onChange={() => handleColorToggle(color.color_id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pr-[141px] w-full">
          <div className="flex sticky top-0 justify-end z-10">
            <Dropdown options={options} onChange={handleInput} />
          </div>
          <div className="flex sticky top-0 justify-end pt-[24px] pb-[18px] font-sans font-normal text-[14px] text-[#000000]">
            Showing {totalProducts} Products
          </div>
          {totalProducts === 0 && (
            <div className="text-[30px] text-[#000000] pt-[60px] font-normal font-sans flex items-center justify-center">
              No products available&#128531;
            </div>
          )}
          {loading ? (
            <div>
              <Loader />
              {/* <div>No products available</div> */}
            </div>
          ) : (
            <div>
              <ShopItem items={items} />
            </div>
          )}
          <div className="pt-[42px] pl-[257px] pb-[58px]">
            <div className=" w-[298px] h-[50px]">
              {hasMoreProducts && (
                <MainButton
                  className={
                    "text-[#0D0D0D] border border-black font-semibold text-[16px] flex items-center justify-center"
                  }
                  buttonName={
                    loading ? (
                      <div className="flex items-center">
                        <Loader className="mr-2" />
                        Loading...
                      </div>
                    ) : (
                      "Load more products"
                    )
                  }
                  onClick={handlePages}
                  width={"298px"}
                  height={"50px"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
