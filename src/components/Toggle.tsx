type ToggleProps = React.InputHTMLAttributes<HTMLInputElement> & {
  labelLeft?: string;
  labelRight?: string;
};
export default function Toggle({
  labelLeft,
  labelRight,
  ...props
}: ToggleProps) {
  return (
    <div className="flex flex-row gap-4">
      {labelLeft ? <div>{labelLeft}</div> : <></>}
      <label htmlFor="darkmode" className="relative cursor-pointer">
        
        <input id="darkmode" className="peer sr-only" type="checkbox" {...props} aria-label="Dark Mode"/>
        <div className=" bg-secondary w-8 h-5 rounded-sm peer-checked:bg-secondary shadow-[inset_1px_1px_2px_#555577] dark:shadow-[inset_1px_1px_2px_#000008]" />
        <div className="peer-checked:translate-x-3 bg-white absolute left-1 top-1 w-3 h-3 transition-transform rounded-xs shadow-[1px_1px_2px_#555577] dark:shadow-[1px_1px_2px_#666688]"/>

      </label>
      {labelRight ? <div>{labelRight}</div> : <></>}
    </div>
  );
}
