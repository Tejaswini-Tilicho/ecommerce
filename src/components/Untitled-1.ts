// // console.log("/reset-password/[id]".startsWith('/reset-password'))
// import firestore from "@react-native-firebase/firestore";
// import { dataFormatter } from "../utils/DataFormatter";

// export class FireBaseModal {
//   constructor(path) {
//     this.basePath = `admin/${path}`;
//   }

//   get = async () => {
//     const data = await firestore().collection(this.basePath).get();
//     const formattedData = dataFormatter(data);
//     return formattedData;
//   };

//   set = async (data) => {
//     const ref = firestore().collection(this.basePath).doc();
//     await ref.set({ id: ref.id, ...data });
//   };

//   update = async (id, data) => {
//     await firestore().collection(this.basePath).doc(id).update(data);
//   };

//   delete = async (id) => {
//     await firestore().collection(this.basePath).doc(id).delete();
//   };

//   createProject = async (data) => {
//     const doc = await firestore().collection(this.basePath).doc();
//     await doc.set({ ...data, id: doc.id, status: "Not Started" });
//   };

//   createTask = async (task) => {
//     await firestore().collection(this.basePath).add(task);
//   };

//   getUser = async (id) => {
//     const data = await firestore()
//       .collection("users")
//       .where("id", "==", id)
//       .get();
//     return dataFormatter(data);
//   };

//   getMembers = async () => {
//     const members = await firestore().collection("users").get();
//     return members;
//   };

//   getUserProjects = async (id) => {
//     const data = await firestore()
//       .collection(this.basePath)
//       .where("selectedMembers", "array-contains", id)
//       .get();
//     return dataFormatter(data);
//   };

//   getProjects = async () => {
//     const projects = await firestore().collection("projects").orderBy().get();
//     return projects;
//   };

//   registerUser = async (id, data) => {
//     await firestore().collection(this.basePath).doc(id).set(data);
//   };

//   getProjectTasks = async (projectId) => {
//     return await firestore()
//       .collection("tasks")
//       // Filter results
//       .where("project_id", "==", projectId)
//       .get();
//   };

//   getCompletedTasks = async (projectId) => {
//     return await firestore()
//       .collection("tasks")
//       // Filter results
//       .where("status", "==", "Completed")
//       .where("project_id", "==", projectId)
//       .get();
//   };

//   getUserTasks = async (id) => {
//     const data = await firestore()
//       .collection(this.basePath)
//       .where("team", "array-contains", id)
//       .get();
//     return dataFormatter(data);
//   };
// }

// export const Modals = {
//   users: new FireBaseModal("users"),
//   projects: new FireBaseModal("projects"),
//   tasks: new FireBaseModal("tasks"),
//   subTasks: new FireBaseModal("sub_tasks"),
//   comments: new FireBaseModal("comments"),
//   teams: new FireBaseModal("teams"),
// };

// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState } from "react";
// import useSWR from "swr";
// import { getApi } from "@/api-client/methods";
// import { LIMIT } from "@/utils/constants";
// import { getProductsData, ProductProps } from "@/utils/interface";
// import Loader from "@/components/Loader";
// import CustomCheckbox from "@/components/CheckBox";
// import ColorPicker from "@/components/ColorPicker";
// import Dropdown from "@/components/DropDown";
// import ShopItem from "@/components/ShopItem";
// import MainButton from "@/components/Button";

// const HomePage = () => {
//   const options = [
//     { label: "Popular", value: "rating" },
//     { label: "Recent", value: "recent" },
//     { label: "Price", value: "price" },
//   ];

//   const [handleOptions, setHandleOptions] = useState<{
//     categories: string[];
//     colors: string[];
//   }>({
//     categories: [],
//     colors: [],
//   });

//   const [dropDownSelection, setDropDownSelection] = useState<string>("rating");
//   const [pageNumber, setPageNumber] = useState<number>(1);
//   const [allProducts, setAllProducts] = useState<getProductsData[]>([]);

//   const handleQuery = (type: string, array: string[]) => {
//     return array.map((item) => `${type}=${item}`).join("&");
//   };

//   const fetcher = async (url: string) => {
//     const data: any = await getApi({ endUrl: url });
//     return data?.data;
//   };

//   const {
//     data: productsData,
//     error: productError,
//     isLoading: productLoading,
//   } = useSWR<ProductProps>("get-product-parameters", fetcher);

//   const {
//     data: getProductsData,
//     error: productsError,
//     isLoading: productsLoading,
//   } = useSWR(
//     `list-products?page=${pageNumber}&limit=${LIMIT}&sort_by=${dropDownSelection}&${handleQuery(
//       "category_id",
//       handleOptions.categories
//     )}&${handleQuery("color_id", handleOptions.colors)}`,
//     fetcher,
//     {
//       onSuccess: (newProducts) => {
//         setAllProducts((prev) => [...prev, ...(newProducts?.products || [])]);
//       },
//     }
//   );

//   const handleCategoryToggle = (category: string) => {
//     setPageNumber(1);
//     setHandleOptions((prev) => {
//       const newCategories = prev.categories.includes(category)
//         ? prev.categories.filter((e) => e !== category)
//         : prev.categories.concat(category);
//       return {
//         ...prev,
//         categories: newCategories,
//       };
//     });
//     setAllProducts([]);
//   };

//   const handleColorToggle = (color: string) => {
//     setPageNumber(1);
//     setHandleOptions((prev) => {
//       const newColors = prev.colors.includes(color)
//         ? prev.colors.filter((e) => e !== color)
//         : prev.colors.concat(color);
//       return {
//         ...prev,
//         colors: newColors,
//       };
//     });
//     setAllProducts([]);
//   };

//   const handleInput = (value: string) => {
//     setDropDownSelection(value);
//     setPageNumber(1);
//     setAllProducts([]);
//   };

//   const handlePages = () => {
//     setPageNumber(pageNumber + 1);
//   };

//   const handleClear = () => {
//     setPageNumber(1);
//     setHandleOptions({ categories: [], colors: [] });
//     setAllProducts([]);
//   };

//   if (productLoading || productsLoading) return <Loader />;
//   if (productError || productsError) return <div>Error loading data</div>;

//   const { total_productss } = getProductsData || {};

//   const hasMoreProducts = (allProducts?.length || 0) < total_productss;

//   return (
//     <div className="h-full pt-[35px] pr-[110px]">
//       <div className="w-screen h-[216px] pl-[145px] bg-[#0D0D0D]">
//         <div className="font-sans text-[36px] text-[#FFFFFF] pt-[34px] font-semibold">
//           Shop Men’s
//         </div>
//         <div className="font-sans w-[476px] text-[18px] font-normal text-[#FFFFFF]">
//           Revamp your style with the latest designer trends in men’s clothing or
//           achieve a perfectly curated wardrobe thanks to our line-up of timeless
//           pieces.
//         </div>
//       </div>
//       <div className="flex">
//         <div className="w-[25%] sticky top-5">
//           <div className="sticky top-10">
//             <div className="pr-[90px] pl-[145px] pt-[43px]">
//               <div className="flex items-center">
//                 <div className="font-sans font-semibold text-[22px]">
//                   Filters
//                 </div>
//                 <div className="h-[20px]">
//                   <button
//                     className="text-[#C4C4C4] text-[14px] font-normal pl-[10px]"
//                     onClick={handleClear}
//                   >
//                     <u>Clear filters</u>
//                   </button>
//                 </div>
//               </div>
//               <div className="pt-[19px] font-sans font-bold text-[14px]">
//                 Categories
//               </div>
//               <div className="pt-[10px] w-[190px]">
//                 {productsData?.categories.map((category: any, index) => (
//                   <CustomCheckbox
//                     key={index}
//                     className={
//                       "border-black text-#111111 font-sans text-[13px] pt-[10px]"
//                     }
//                     placeholder={category.category_name}
//                     onChange={() => handleCategoryToggle(category.category_id)}
//                     checked={handleOptions.categories.includes(
//                       category.category_id
//                     )}
//                   />
//                 ))}
//               </div>
//               <div className="pt-[50px]">
//                 <div className="h-[87px]">
//                   <div className="text-[18px] font-normal font-sans text-[#979797]">
//                     Color
//                   </div>
//                   <div
//                     className={`grid grid-cols-5 gap-[10px] pt-[10px] max-w-[157px]`}
//                   >
//                     {productsData?.colors.map((color: any, index) => (
//                       <ColorPicker
//                         key={index}
//                         label={color?.color_code}
//                         value={color?.color_id}
//                         checked={handleOptions.colors.includes(color.color_id)}
//                         onChange={() => handleColorToggle(color.color_id)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="pl-[90px] pt-[30px] pr-[141px] w-[75%]">
//           <div className="flex sticky top-0 justify-end z-10">
//             <Dropdown options={options} onChange={handleInput} />
//           </div>
//           <div className="flex sticky top-0 justify-end pt-[24px] pb-[18px] font-sans font-normal text-[14px] text-[#000000]">
//             Showing {allProducts.length} of {total_productss} Products
//           </div>
//           {allProducts.length === 0 && (
//             <div className="text-[30px] text-[#000000] pt-[60px] font-normal font-sans flex items-center justify-center">
//               No products available&#128531;
//             </div>
//           )}
//           <div>
//             <ShopItem items={allProducts || []} />
//           </div>
//           <div className="pt-[42px] pl-[257px] pb-[58px]">
//             <div className=" w-[298px] h-[50px]">
//               {hasMoreProducts && (
//                 <MainButton
//                   className={
//                     "text-[#0D0D0D] border border-black font-semibold text-[16px] flex items-center justify-center"
//                   }
//                   buttonName={
//                     productsLoading ? (
//                       <div className="flex items-center">
//                         <Loader className="mr-2" />
//                         Loading...
//                       </div>
//                     ) : (
//                       "Load more products"
//                     )
//                   }
//                   onClick={handlePages}
//                   width={"298px"}
//                   height={"50px"}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
