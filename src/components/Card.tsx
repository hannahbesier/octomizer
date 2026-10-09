import { ReactNode } from "react";

export default function Card({ title, children }: { title: string, children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-8 min-h-40 p-2 shadow rounded-3xl min-w-50">
      <h2 className="flex text-md sm:text-lg w-full p-2 justify-center bg-secondary rounded-t-2xl shadow-inset dark:shadow-insetDarkmode">{title}</h2>
      {children}
    </div>
  );
}
