"use client";
import { useSortable } from "@dnd-kit/react/sortable";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { Launch } from "@carbon/icons-react";
import { BoardIssue } from "@/store/types";

export default function Draggable(props: {
  id: string;
  index: number;
  column: string;
  issue: BoardIssue;
}) {
  const { ref, isDragging } = useSortable({
    id: props.id,
    index: props.index,
    type: "item",
    accept: "item",
    data: {
      type: "issue",
      issue: props.issue,
      columnId: props.column,
    },
  });
  const router = useRouter();
  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="flex flex-col gap-1 w-full shadow-inset dark:shadow-insetDarkmode rounded-sm pr-4 pl-4 pt-2 pb-2"
    >
      <div className="flex flex-row w-full">
        <p className="w-full">{props.id}</p>
        <Button
          onClick={() => {
            router.push(`/explorer/issueEdit?issueId=${props.issue.id}`);
          }}
          primary={true}
          size={"small"}
          icon={<Launch size="16" className="text-foreground" />}
        />
      </div>
      <div className="flex flex-row gap-2 text-sm">
        {props.issue.assignedTo.name}
      </div>
    </div>
  );
}
