import { ReactNode } from "react";

export default function Card({ title, children }: { title: string, children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-8 min-h-40 p-2 shadow dark:shadow-darkmode rounded-md min-w-50">
      <h2 className="flex text-md sm:text-lg w-full p-2 justify-center bg-secondary rounded-t-sm shadow-inset dark:shadow-insetDarkmode">{title}</h2>
      <div className="pl-4 pr-4 pb-4 h-full ">{children}</div>
      <div className="flex justify-between w-full">
        <div className="h-2 w-2 shadow-inset dark:shadow-insetDarkmode rounded-xs bg-secondary"/>
        <div className="h-2 w-2 shadow-inset dark:shadow-insetDarkmode rounded-xs bg-secondary"/>
      </div>
    </div>
  );
}
