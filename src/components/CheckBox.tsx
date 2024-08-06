interface Check {
  className: string;
  placeholder: string;
  onChange: any;
  checked: boolean;
  onClick?: () => void;
}

const CustomCheckbox = ({
  className,
  placeholder,
  onChange,
  checked,
  onClick,
}: Check) => {
  // const [saveInfo, setSaveInfo] = useState(false)
  // const handleToggle = () => {
  //   console.log(saveInfo);
  //   setSaveInfo(!saveInfo);
  // };
  return (
    <label className={`flex items-center relative ${className}`}>
      <input
        type="checkbox"
        className="square-checkbox relative"
        checked={checked}
        onChange={onChange}
        onClick={onClick}
        // onClick={handleToggle}
      />

      {checked && <div className="pl-[4px] absolute text-black">✔</div>}

      <span className="ml-2">{placeholder}</span>
    </label>
  );
};

export default CustomCheckbox;
