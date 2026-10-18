type TextfieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  value: string;
  setValue: (value: string) => void,
  password?: boolean;
  valable?: boolean;
  hiddenLabel?: boolean;
};
export default function Textfield({ label, value, setValue, valable = true, password, hiddenLabel = false, ...props }: TextfieldProps) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={label} className="text-sm sm:text-xs pl-1 w-full">{!hiddenLabel ? label : ""}</label>
      <input
        key={label}
        id={label}
        type={password ? "password" : "text"}
        className="shadow-inset dark:shadow-insetDarkmode pl-2 pr-2 rounded-sm w-full h-8 sm:h-fit"
        value={value}
        placeholder={label}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      { valable ? <div className="h-4 w-4"></div> : <p className="text-xs pl-1 text-red-600">Enter correct {label?.toLocaleLowerCase()}</p>}
    </div>
  );
}
