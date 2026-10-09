type TextfieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  value: string;
  setValue: (value: string) => void,
  password?: boolean;
  valable?: boolean;
};
export default function Textfield({ label, value, setValue, valable = true, password, ...props }: TextfieldProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-xs pl-1 w-full">{label}</label>
      <input
        key={label}
        type={password ? "password" : "text"}
        className="shadow-inset dark:shadow-insetDarkmode pl-1 pr-1 rounded-sm w-full"
        value={value}
        placeholder={label}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      { valable ? <div className="h-4 w-4"></div> : <p className="text-xs pl-1 text-red-600">Enter correct {label?.toLocaleLowerCase()}</p>}
    </div>
  );
}
