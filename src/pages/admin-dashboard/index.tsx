/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Input from "@/components/Input";
import CustomCheckbox from "@/components/CheckBox";
import { useEffect, useState } from "react";
import { deleteApi, getApi } from "@/api-client/methods";
import { getProductsData, ProductProps } from "@/utils/interface";
import { useRouter } from "next/router";
import { LIMIT } from "@/utils/constants";
import MainButton from "@/components/Button";
import Loader from "@/components/Loader";
import { useCartContext } from "@/context/context";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const router = useRouter();

  const [handleOptions, setHandleOptions] = useState<{
    categories: string[];
    // colors: string[];
  }>({
    categories: [],
    // colors: [],
  });
  const [productsData, setProductsData] = useState<ProductProps>({
    categories: [],
    colors: [],
    sizes: [],
  });
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [items, setItems] = useState<getProductsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsInfo, setProductsInfo] = useState<any>({});
  const { state, dispatch } = useCartContext();
  const [searchParams, setSearchParams] = useState<string | null>("");
  // const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    getProductDetails({ dispatch });
  }, [pageNumber, handleOptions, searchParams]);

  useEffect(() => {
    getHomepageData();
  }, []);

  const handleQuery = (type: string, array: string[]) => {
    return array.map((item) => `${type}=${item}`).join("&");
  };

  const getProductDetails: any = async ({ dispatch }: any) => {
    setLoading(true);
    const query = `page=${pageNumber}&limit=${LIMIT}&search=${searchParams}&${handleQuery(
      "category_id",
      handleOptions.categories
    )}`;
    const getProductsData: any = await getApi({
      endUrl: `list-products?${query}`,
    });

    if (getProductsData) {
      setProductsInfo(getProductsData?.data);
      if (pageNumber === 1) {
        setItems(getProductsData?.data?.products);
        dispatch({
          type: "ADMIN_PRODUCTS",
          payload: getProductsData?.data?.products,
        });
        dispatch({
          type: "SYNC_API",
          payload: getProductsData?.data?.products,
        });
      } else {
        setItems((prev) => [...prev, ...getProductsData?.data?.products]);
      }
      setTotalProducts(getProductsData?.data?.total_products);
      setHasMoreProducts(
        items.length + getProductsData?.data?.products.length <
          getProductsData?.data?.total_productss
      );
    } else {
      setHasMoreProducts(false);
    }

    setLoading(false);
  };
  // console.log(productsInfo, "info");
  const handleCategoryToggle = (categoryId: string) => {
    setPageNumber(1);
    setItems([]);
    setHandleOptions((prev) => {
      let newCategories;
      if (prev.categories.includes(categoryId)) {
        newCategories = prev.categories.filter((id) => id !== categoryId);
      } else {
        newCategories = prev.categories.concat(categoryId);
      }

      return {
        ...prev,
        categories: newCategories,
      };
    });
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
  const accessToken = localStorage.getItem("accessToken");
  // console.log(state, "stateCheck");

  const handlePages = () => {
    setLoading(true);
    setPageNumber(pageNumber + 1);
  };

  const handleClear = () => {
    setPageNumber(1);
    setItems([]);
    setHandleOptions({ categories: [] });
    setSearchParams("");
  };

  const handleDelete = async (id: any) => {
    // console.log(id, "iddelete");
    try {
      const deleteData: any = await deleteApi({
        endUrl: `admin/delete-product/${id}`,
        data: id,
        headers: `Bearer ${accessToken}`,
      });

      console.log(deleteData?.status);
      if (!deleteData?.status) {
        toast.error(deleteData?.message);
      }

      await getProductDetails({ dispatch });
    } catch (err) {
      console.log(err);
      toast.error("Error occured");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(e.target.value);
    setPageNumber(1);
    setItems([]);
  };
  return (
    <div className="bg-[#EFF2F6] h-[100%]">
      <div className="flex justify-between">
        <div className="font-sans font-semibold text-[36px] text-[#000000] ml-[145px] pt-[94px]">
          Products List
        </div>
        <div>
          <Input
            className="w-[392px] h-[39px] text-[16px] font-sans font-medium text-[#979797] pl-[67.1px] pt-[7.92px] pb-[9.08px] mt-[100px] bg-[#EFF2F6] mr-[123px]"
            type={"text"}
            placeholder={"Search for a product with name or ID"}
            min={1}
            max={30}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="flex">
        <div className="sticky top-5 h-full">
          <div>
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
            </div>
          </div>
        </div>

        <div className="flex-col">
          {productsInfo?.products?.map((product: any, index: any) => (
            <div key={product.id}>
              <div className="flex">
                <img
                  className="w-[129px] h-[133px] mt-[53px]"
                  src={product.images[0] || ""}
                  alt="Product Image"
                />
                <div className="flex-col font-sans font-semibold text-[22px] text-[#000000] mt-[53px] ml-[7px]">
                  <div className="w-[300px]">{product.product_name}</div>
                  <div>${product.price}</div>
                </div>
                <div className="flex">
                  <MainButton
                    className={
                      "text-[#0D0D0D] border border-black font-semibold font-sans text-[16px] mt-[76px] ml-[269px]"
                    }
                    buttonName={"Edit"}
                    onClick={() =>
                      router.push(`/edit-products/${product?.product_id}`)
                    }
                    width={"164px"}
                    height={"46px"}
                  />
                  <MainButton
                    className={
                      "text-[#0D0D0D] border border-black font-semibold font-sans text-[16px] mt-[76px] ml-[42px]"
                    }
                    buttonName={"Delete"}
                    onClick={() => handleDelete(product?.product_id)}
                    width={"164px"}
                    height={"46px"}
                  />
                </div>
              </div>
              {index < productsInfo?.products?.length - 1 && (
                <div className="border-[1px] w-full h-0.5 border-[#909090] my-[17px]"></div>
              )}
            </div>
          ))}

          <div className="pt-[42px] pl-[257px] pb-[58px]">
            <div className="flex w-[298px] h-[50px]">
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
              <MainButton
                className={`bg-[#0D0D0D] text-[#FFFFFF] text-[16px] font-semibold ml-[66px]`}
                buttonName={"Back"}
                onClick={() => router.push("/admin-home")}
                width={"149px"}
                height={"50px"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
