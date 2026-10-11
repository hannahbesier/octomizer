import { useState } from "react";
import { ChevronDown } from "@carbon/icons-react";
type DropdownSearchProps = {
  label?: string;
  currentValue: string;
  setCurrentValue: (value: string) => void;
  options: string[];
};
export default function DropdownSearch({
  label,
  currentValue,
  setCurrentValue,
  options,
  ...props
}: DropdownSearchProps) {
  const [dropdown, setDropdown] = useState(false);

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDropdown(false);
    }
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setDropdown(false);
      e.currentTarget.blur();
    }
  }
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentValue(e.target.value);
    
      options.filter((option) => option.includes(e.target.value))
    
  }
  function handleOnClickOption(option: string) {
    setCurrentValue(option);
    setDropdown(false);
  }
  return (
    <div className="flex flex-col relative w-full" tabIndex={-1} onBlur={handleBlur}>
      {" "}
      <label className="text-sm sm:text-xs pl-1">{label}</label>
      <div className="flex flex-row">
        <input
          className="shadow-inset dark:shadow-insetDarkmode rounded-l-sm pl-2 w-full h-8 sm:h-fit"
          type="search"
          list="assignedTo"
          value={currentValue ?? "default"}
          placeholder="select"
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
          onFocus={() => setDropdown(true)}
          {...props}
        />
        <button
          className="shadow-inset dark:shadow-insetDarkmode rounded-r-sm sm:fit w-8 justify-center flex items-center"
          onClick={() => ( dropdown ? setDropdown(false) : setDropdown(true))}
        >
          <ChevronDown size="24" />
        </button>
      </div>
      {dropdown && (
        <div
          className="flex flex-col p-1 absolute top-full right-0 left-0 z-10 bg-background rounded-sm shadow dark:shadow-darkmode"
          id={label}
        >
          {options.map((option) => (<div key={option} className="border-b-1 border-secondary last:border-b-0">
            <button
              className=" flex w-full pl-2 pr-2 p-1 hover:bg-secondary cursor-pointer active:shadow-inset rounded-sm"
              
              onClick={() => handleOnClickOption(option)}
            >
              {option}
            </button></div>
          ))}
        </div>
      )}
      <label className="text-xs pl-1 text-red-400">
        {options.find((option) => option === currentValue)
          ? ""
          : "Select an accepted value"}
      </label>
    </div>
  );
}
