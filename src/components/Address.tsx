import { useEffect, useState } from "react";
import SingleDropdown from "./SingleDropdown";
import { PostAddressProps } from "@/utils/interface";
import { useCartContext } from "@/context/context";
import MainButton from "./Button";
import Input from "./Input";
import CustomCheckbox from "./CheckBox";
import { getAddresses } from "@/utils/common/common.api";
import { OrderObject } from "@/api-classes/apis";

interface AddressProps {
  nextStep: () => void;
}

const Address: React.FC<AddressProps> = ({ nextStep }) => {
  const { state, dispatch } = useCartContext();
  const selectAddressData = state?.checkout?.address?.currentAddress;

  useEffect(() => {
    getAddresses({ dispatch });
    if (selectAddressData?.id) {
      setSelectedId(selectAddressData?.id);
    }
  }, [dispatch, selectAddressData]);

  const [info, setInfo] = useState<PostAddressProps>({
    first_name: "",
    last_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    country: "",
    pincode: "",
  });

  const [validations, setValidations] = useState({
    first_name: false,
    last_name: false,
    address_line1: false,
    address_line2: false,
    city: false,
    country: false,
    pincode: false,
  });

  const [selectedId, setSelectedId] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    // console.log(name, "namm23", value);
    setInfo((prev) => ({
      ...prev,
      [name]: value.toString(),
    }));
  };

  const handleValidationChange = (name: string, isValid: boolean) => {
    setValidations((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleAddAddress = () => {
    setShowAddressForm(true);
  };

  const handleAddressChange = (id: string) => {
    setSelectedId(id);
    const selectedAddress = state.checkout.address.addresses.find(
      (address: { id: string }) => address.id === id
    );
    dispatch({ type: "SET_CURRENT_ADDRESS", payload: selectedAddress });
    dispatch({ type: "SET_SELECTED_ADDRESS", payload: id });
  };

  const handleToggle = () => {
    // console.log(saveInfo, "save");
    setSaveInfo(!saveInfo);
  };

  const handleAddress = async () => {
    if (selectedId) {
      nextStep();
      return;
    }
    const isFormValid = Object.values(validations).every((isValid) => isValid);
    if (saveInfo && isFormValid) {
      await postAddress(info);
    }

    if (isFormValid) {
      dispatch({ type: "SET_CURRENT_ADDRESS", payload: info });
      nextStep();
    }
  };

  const postAddress = async (data: PostAddressProps) => {
    const address = await OrderObject.postAddressData.postAddress(data);
    return address;
  };

  const isFormValid = Object.values(validations).every((isValid) => isValid);

  return (
    <div className="bg-[#EFF2F6] pb-[15px] h-[100%]">
      <div className="text-[#252525] font-sans font-normal text-[20px]">
        Shipping Information
      </div>
      {showAddressForm ? (
        <div>
          <div className="flex gap-[7px] mt-[7px]">
            <Input
              className="bg-[#EFF2F6] my-[5px] pl-[16px] h-[40px] py-[11.5px] font-sans font-normal text-[#A9ABBD] text-[14px]"
              type={"text"}
              placeholder={"First Name"}
              onChange={handleInputChange}
              name="first_name"
              value={info.first_name}
              min={3}
              max={15}
              onValidationChange={(isValid) =>
                handleValidationChange("first_name", isValid)
              }
            />
            <Input
              className="bg-[#EFF2F6] my-[5px] pl-[16px] h-[40px] py-[11.5px] font-sans font-normal text-[#A9ABBD] text-[14px]"
              type={"text"}
              placeholder={"Last Name"}
              onChange={handleInputChange}
              value={info.last_name}
              name="last_name"
              min={3}
              max={10}
              onValidationChange={(isValid) =>
                handleValidationChange("last_name", isValid)
              }
            />
          </div>
          <Input
            className="bg-[#EFF2F6] my-[5px] pl-[16px] h-[40px] py-[11.5px] font-sans font-normal text-[#A9ABBD] text-[14px]"
            type={"text"}
            placeholder={"Address"}
            onChange={handleInputChange}
            value={info.address_line1}
            name="address_line1"
            min={15}
            max={50}
            onValidationChange={(isValid) =>
              handleValidationChange("address_line1", isValid)
            }
          />
          <Input
            className="bg-[#EFF2F6] my-[5px] pl-[16px] h-[40px] py-[11.5px] font-sans font-normal text-[#A9ABBD] text-[14px]"
            type={"text"}
            placeholder={"Apartment, suite, etc (optional)"}
            onChange={handleInputChange}
            value={info.address_line2}
            name="address_line2"
            min={15}
            max={50}
            onValidationChange={(isValid) =>
              handleValidationChange("address_line2", isValid)
            }
          />

          <div className="flex gap-[12px] my-[5px] w-full h-[40px]">
            <SingleDropdown
              className="bg-[#EFF2F6] pl-[16px] flex items-center w-full py-[11.5px] font-sans font-normal text-[#A9ABBD] text-[14px]"
              options={[
                { label: "India", value: "India" },
                { label: "Indonesia", value: "Indonesia" },
                { label: "Australia", value: "Australia" },
                { label: "Switzerland", value: "Switzerland" },
              ]}
              placeholder="Country"
              onChange={(option) => {
                setInfo((prev: any) => {
                  return { ...prev, country: option.label };
                });
                handleValidationChange("country", !!option.value);
              }}
              value={info.country}
            />
            <SingleDropdown
              className="bg-[#EFF2F6] pl-[16px] flex items-center w-full py-[11.5px] font-sans font-normal text-[#A9ABBD] text-[14px]"
              options={[
                { label: "Hyderabad", value: "Hyderabad" },
                { label: "Vizag", value: "Vizag" },
                { label: "Bangalore", value: "Bangalore" },
                { label: "Pune", value: "Pune" },
              ]}
              onChange={(option) => {
                setInfo((prev: any) => {
                  return { ...prev, city: option.label };
                });
                handleValidationChange("city", !!option.value);
              }}
              placeholder="City"
              value={info.city}
            />
          </div>

          <div className="flex gap-[12px] my-[5px] w-full h-[40px]">
            <Input
              className="bg-[#EFF2F6] pl-[16px] w-full py-[7px] font-sans font-normal text-[#A9ABBD] text-[14px]"
              type={"number"}
              placeholder={"Pincode"}
              min={6}
              max={6}
              name="pincode"
              onChange={handleInputChange}
              value={info.pincode}
              onValidationChange={(isValid) =>
                handleValidationChange("pincode", isValid)
              }
            />
          </div>

          <CustomCheckbox
            className={
              "text-[#979797] text-[14px] font-sans font-normal mt-[23px]"
            }
            placeholder={"Save contact information"}
            onClick={handleToggle}
            onChange={undefined}
            checked={saveInfo}
          />
          <div className="flex pt-[10px]">
            <input onClick={() => setShowAddressForm(false)} type="radio" />
            <label className="text-[#000000] font-sans text-[16px] pl-[3px]">
              Choose Address
            </label>
          </div>
        </div>
      ) : (
        <div>
          <form>
            {state?.checkout?.address?.addresses.map((address: any) => {
              const textAddress = `${address?.address_line1}, ${address?.address_line2}, ${address?.city}, ${address?.pincode}, ${address.country}.`;

              return (
                <div
                  key={address?.id}
                  className="flex w-[500px] h-[60px] bg-[#FFFFFF] p-[10px] pb-[15px] m-[10px] cursor-pointer"
                  onClick={() => handleAddressChange(address?.id)}
                >
                  <input
                    type="radio"
                    value={textAddress}
                    checked={
                      state?.checkout?.address?.selectedId === address?.id
                    }
                    // checked={selectedId === address?.id}
                    onChange={() => handleAddressChange(address?.id)}
                    className="cursor-pointer"
                  />
                  <label className="text-[#000000] pb-[3px] font-sans text-[16px] pl-[3px]">
                    {textAddress}
                  </label>
                </div>
              );
            })}
          </form>

          <div className="flex items-center justify-center">
            <button
              className="bg-[#ADADAD] text-[#000000] px-[20px] flex items-center justify-center pt-[5px] h-[40px] text-[16px] font-sans font-semibold"
              onClick={handleAddAddress}
            >
              + Add another Address
            </button>
          </div>
        </div>
      )}
      <MainButton
        // className={
        //   isFormValid
        //     ? `bg-[#0D0D0D] font-sans font-semibold text-[16px] cursor-pointer text-[#FFFFFF] w-full mt-[30px]`
        //     : `bg-[#ADADAD] font-sans font-semibold text-[16px] cursor-not-allowed text-[#FFFFFF] w-full mt-[30px]`
        // }
        className={
          "bg-[#0D0D0D] font-sans font-semibold text-[16px] cursor-pointer text-[#FFFFFF] w-full mt-[30px]"
        }
        buttonName={"Continue to shipping"}
        onClick={handleAddress}
        width={""}
        height={"50px"}
        // disabled={!isFormValid && !selectedId}
      />
    </div>
  );
};

export default Address;
