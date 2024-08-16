import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCartContext } from "@/context/context";
import { useState } from "react";
import { useRouter } from "next/router";
import { calculateTotalAmount } from "@/utils/helpers";
import Address from "@/components/Address";
import Shipping from "@/components/Shipping";
import Steps from "@/components/Steps";
import Cart1 from "@/components/CartWithoutRemove";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import Input from "@/components/Input";
import useSWR from "swr";
import { OrderObject, ProductObject } from "@/api-classes/apis";

const stripePromise = loadStripe(
  "pk_test_51Paw4TRrpeYldV0YphWsfpOZqwApIHf2IbS1TOIe9686LQKFY8vNciPdFtUZ38mr06rfaAQKlFavikOpYKfEYDjD00tTteCqOh"
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = React.useState("");

  const { state, dispatch } = useCartContext();
  const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter();
  const singleProductCalculation = [];
  singleProductCalculation.push(state?.singleproduct?.productDetails);

  const { buyNow, product_name, quantity, size, product_id } = router.query;

  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  const fetcher = () => {
    return ProductObject.productDetails.fetchProductDetails(
      product_id as string
    );
  };

  const { data: productDetails } = useSWR(
    product_id ? `products/${product_id}` : null,
    fetcher
  );

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const setAddress = (address: any) => {
    dispatch({ type: "SET_ADDRESS", payload: address });
  };

  const handlePayment = async () => {
    const singleProductCalculation = [state?.singleproduct?.productDetails];
    const { buyNow } = router.query;
    const updatedProducts = singleProductCalculation.map(
      ({ price, ...rest }) => rest
    );
    const transformedDataSingle = updatedProducts?.map(({ size, ...rest }) => ({
      size_id: size,
      ...rest,
    }));
    console.log(singleProductCalculation, "arrayOf");

    interface UpdatedProduct {
      images: string[];
      category_id: string;
      price: string;
      product_name: string;
    }

    console.log(state?.cart?.productIds, "state");
    const updatedProductDetails: UpdatedProduct[] =
      state?.cart?.productIds?.map(
        ({ images, category_id, price, product_name, ...rest }: any) => rest
      );
    const transformedDataMulti = updatedProductDetails.map((item: any) => ({
      product_id: item.product_id,
      size_id: item.size.size_id,
      quantity: item.quantity,
      color_id: item.color.color_id,
    }));

    const getObject = ({ state }: any) => {
      let finalObject;
      if (buyNow) {
        finalObject = {
          amount: calculateTotalAmount(singleProductCalculation),
          shipping_type: state?.checkout?.shipping?.shippingType,
          address: state?.checkout?.address?.currentAddress,
          product_details: transformedDataSingle,
        };
      } else {
        finalObject = {
          amount: calculateTotalAmount(state?.cart?.productIds),
          shipping_type: state?.checkout?.shipping?.shippingType,
          address: state?.checkout?.address?.currentAddress,
          product_details: transformedDataMulti,
        };
      }

      return finalObject;
    };

    const orderData = getObject({ state });

    const { id, user_id, ...rest } = orderData?.address;
    const finalOrderData = { ...orderData, address: rest };

    // const response: any = await postOrder(finalOrderData);
    const response: any = await OrderObject.postOrderData.postOrder(
      finalOrderData
    );

    setCurrentStep(currentStep + 1);
    setClientSecret(response?.data?.client_secret);
  };

  const renderStep = (currentStep: any) => {
    switch (currentStep) {
      case 0:
        return (
          <div className={currentStep === 0 ? "" : "w-0 h-0 opacity-0 fixed"}>
            <Address nextStep={handleNext} />
          </div>
        );
      case 1:
        return (
          <div className={currentStep === 1 ? "" : "w-0 h-0 opacity-0 fixed"}>
            <Shipping finalOrderData={handlePayment} />
          </div>
        );
      case 2:
        return (
          <div className={currentStep === 2 ? "" : "w-0 h-0 opacity-0 fixed"}>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        );
      default:
        return <Address nextStep={handleNext} />;
    }
  };
  return (
    <div className="bg-[#EFF2F6] flex h-screen ml-[141px]">
      <div className="">
        <div className="pt-[111px] w-full">
          <div className="flex flex-col">
            <div className="text-[36px] font-sans font-semibold text-[#000000]">
              Check out
            </div>
            <div className="mt-[13px] mb-[13px]"></div>
            <div className="mt-[13px] mb-[13px]">
              <Steps
                stringStep={
                  currentStep === 0
                    ? "Address"
                    : currentStep === 1
                    ? "Shipping"
                    : "Payment"
                }
                setCurrentStep={setCurrentStep}
              />
            </div>
            {renderStep(currentStep)}
          </div>
        </div>
      </div>

      <div className="mt-[151px] w-full mr-[204px] ml-[249px]">
        <div className="font-sans font-normal text-[20px] text-[#252525]">
          Your Cart
        </div>

        {buyNow ? (
          <div>
            <Cart1
              image={productDetails?.images[0]}
              text={product_name as string}
              size={size as string}
              cost={productDetails?.price}
              quantity={Number(quantity)}
              onRemove={function (): void {
                throw new Error("Function not implemented.");
              }}
              onIncrement={function (): void {
                throw new Error("Function not implemented.");
              }}
              onDecrement={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        ) : (
          <div className="h-[200px] overflow-y-auto">
            {state?.cart?.productIds?.map((item: any, index: any) => (
              <Cart1
                key={index}
                image={item.images[0]}
                text={item.product_name}
                size={item.size?.size_type}
                quantity={item.quantity}
                cost={item.price}
                onRemove={() => {}}
                onIncrement={() => {}}
                onDecrement={() => {}}
              />
            ))}
          </div>
        )}

        <Input
          className="mt-[15px] font-sans text-[#A9ABBD] font-normal text-[14px] py-[11.5px] pl-[16px] outline-none bg-[#EFF2F6]"
          type={"text"}
          placeholder={"Enter coupon code here"}
          min={0}
          max={0}
        />
        <div className="h-[96px]">
          <div className="flex justify-between pt-[16px] text-[14px] font-sans text-[#0D0D0D] font-normal">
            <div>Subtotal</div>
            {!buyNow ? (
              <div>
                <div>${calculateTotalAmount(state?.cart?.productIds)}</div>
              </div>
            ) : (
              <div>
                <div>${calculateTotalAmount(singleProductCalculation)}</div>
              </div>
            )}
          </div>
          <div className="flex justify-between pt-[16px] text-[14px] font-sans text-[#0D0D0D] font-normal">
            <div>Shipping</div>
            <div>Calculated at the next step</div>
          </div>
          <div className="border-[1px] mt-[16px] border-[#000000]"></div>
          <div className="flex justify-between pt-[16px] text-[14px] font-sans text-[#0D0D0D] font-normal">
            <div>Total</div>
            {!buyNow ? (
              <div>
                <div>${calculateTotalAmount(state?.cart?.productIds)}</div>
              </div>
            ) : (
              <div>
                <div>${calculateTotalAmount(singleProductCalculation)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
