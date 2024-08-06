export interface AddProductProps {
  product_name: string;
  images: string[];
  quantity: number | undefined;
  size_ids: string[];
  price: number | undefined;
  color_ids: string[];
  category_id: string;
  description: string;
}

export interface RegisterProps {
  full_name: string;
  email: string;
  password: string;
}

export interface InfoProps {
  role: string;
  email: string;
  full_name: string;
  accessToken: string;
  refreshToken: string;
}

export interface APIprops {
  endUrl: string;
  params?: any;
  data?: any;
  headers?: any;
  status?: any;
}

// export interface Product {
//   id: number;
//   name: string;
//   price: number;
//   available_sizes: string[];
//   available_colours: string[];
//   categoryts: string;
// }

export interface API<T> {
  status: string;
  message: string;
  data: T;
}

export interface ProductProps {
  colors: string[];
  sizes: string[];
  categories: string[];
}

export interface getProductsData {
  categories: any;
  colors: any;
  name: any;
  id: any;
  product_id: string;
  product_name: string;
  description: string;
  images: string[];
  price: number;
  category_id: string;
  rating: number | null;
  quantity: number;
  size_ids: string[];
  color_ids: string[];
  sizes: string[];
  product_status: string;
}

export interface PostAddressProps {
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  country: string;
  pincode: string;
}

export interface OrderPlacedProps {
  amount: number;
  shipping_type: string;
  address: {};
  product_details: [
    {
      product_id: string;
      size: string;
      quantity: 0;
      colour: string;
    }
  ];
}

export interface ProductsProps {
  product_id: string;
  product_name: string;
  images: string[];
  description: string;
  available_sizes: string[];
  available_colours: string[];
  price: number;
  category: string;
  rating: number;
  quantity: number;
}

export interface ListProductProps {
  product_id: string;
  product_name: string;
  description: string;
  images: string[];
  price: number;
  category_id: string;
  rating: number | null;
  quantity: number;
  size_ids: string[];
  color_ids: string[];
  sizes: string[];
  product_status: string;
}
export interface GetProductsProps {
  success: string;
  products: [];
  totalPages: number;
  current_page: string;
  total_productss: number;
}

// export interface IProductParameters {
//   colors: [];
//   sizes: [];
//   categories: [];
// }
