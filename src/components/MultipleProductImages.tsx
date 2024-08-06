import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getApi } from "@/api-client/methods";

interface ImageGridProps {
  images: string[];
  onClick: () => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onClick }) => {
  const router = useRouter();
  const { id, category } = router.query;

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const response: any = await getApi({
          endUrl: `products/${id}`,
        });
        setSelectedProduct(response.data);
      }
    };

    fetchProduct();
  }, [id]);

  // const handleImageClick = () => {
  //   router.push(
  //     `/Home/${selectedProduct.product_id}/${selectedProduct.category}`
  //   );
  // };

  return (
    <div className="grid grid-cols-2 gap-3">
      {images?.map((image, index) => (
        <div className="relative h-[271px] bg-black font-primary" key={index}>
          <Image
            src={image}
            alt="Image 1"
            layout="fill"
            objectFit="cover"
            onClick={onClick}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;

// import React, { useContext } from "react";
// import NextImage from "next/image";
// import { useRouter } from "next/router";
// import { ProductContext } from "@/pages/_app";

// interface ImageGridProps {
//   images: string[];
// }

// const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
//   const router = useRouter();
//   const { productDetails } = useContext(ProductContext);

//   const handleImageClick = (image: string) => {
//     // Redirect to ProductDetails page or perform any action needed
//     router.push(`/Home/${productDetails.product_id}/${productDetails.category}`);
//   };

//   return (
//     <div className="grid grid-cols-2 gap-4">
//       {images.map((image, index) => (
//         <div key={index} onClick={() => handleImageClick(image)}>
//           <NextImage
//             src={image}
//             alt={`Product image ${index + 1}`}
//             className="w-full h-full object-cover cursor-pointer"
//             width={271}
//             height={271}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImageGrid;
