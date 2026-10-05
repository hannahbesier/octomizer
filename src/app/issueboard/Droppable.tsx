import React from "react";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";

export default function Droppable(props: {
  children: React.ReactNode;
  id: string;
  containedNumbers: number;
}) {
  const { ref } = useDroppable({
    id: props.id,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
    data: {
      columnId: props.id,
    },
  });

  return (
    <div className="w-full sm:max-w-80 sm:mr-10 ">
      <div
        ref={ref}
        className=" h-full p-2 shadow dark:shadow-darkmode bg-secondary rounded-sm flex flex-col gap-2 overflow-y-auto overlow-x-hidden "
      >
        <header className="flex flex-row pl-2 pr-2">
          <h1 className="flex-1">{props.id}</h1>
          <div className=" text-xs leading-6 bg-hover pl-3 pr-3 rounded-xl">
            {props.containedNumbers}
          </div>
        </header>
        {props.children}
      </div>
    </div>
  );
}
