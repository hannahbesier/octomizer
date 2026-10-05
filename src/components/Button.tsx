type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  mobileOnlyIcon?: boolean;
  label?: string;
};
export default function Button({
  primary,
  size = "medium",
  icon,
  label,
  mobileOnlyIcon,
  ...props
}: ButtonProps) {
  const sizeBtn = {
    small: "pl-1 pr-1",
    medium: "pl-2 pr-2 p-1",
    large: "pl-6 pr-6 p-2 text-lg",
  }[size];
  const styleBtn = {
    primaryLabel:
      "bg-primary text-white hover:bg-[#5b73bb] dark:hover:bg-hover active:shadow-none border-none shadow dark:shadow-darkmode",
    secondary: "bg-transparent text-foreground hover:bg-hover active:shadow-none shadow dark:shadow-darkmode",
    primaryIcon: "bg-transparent hover:bg-hover active:shadow-inset border-none",
    iconLabel: "gap-2 items-center",
  };
  return (
    <button
      className={` ${primary && label ? styleBtn.primaryLabel : ""}
      ${!primary ? styleBtn.secondary : ""}
      ${primary && !label ? styleBtn.primaryIcon : ""}
      ${icon && label ? styleBtn.iconLabel : ""}
      rounded-md ${sizeBtn} flex cursor-pointer items-center w-fit`}
      {...props}
    >
      {icon ?? <></>}
      <div
        data-labelicon={label && icon && mobileOnlyIcon}
        className="data-labelicon:hidden data-labelicon:sm:block"
      >
        {label}
      </div>
    </button>
  );
}
