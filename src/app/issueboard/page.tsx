"use client";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import Button from "@/components/Button";
import { Add } from "@carbon/icons-react";
import { useGetBoardQuery, useUpdateIssueMutation } from "@/store/api/api";
import { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";
import checkAuth from "@/lib/checkAuth";
import { BoardIssue } from "@/store/types";

// https://dndkit.com/react/guides/multiple-sortable-lists/
function IssueBoard() {
  const { data: board } = useGetBoardQuery();
  const [currentIssue, setCurrentIssue] = useState<BoardIssue>();
  const [issueBoard, setIssueboard] = useState<Record<string, string[]>>();
  const [updateIssue] = useUpdateIssueMutation({
    fixedCacheKey: "shared-update-post",
  });

  useEffect(() => {
    if (!board) return;
    const newBoard: Record<string, string[]> = Object.fromEntries(
      board.map((column) => [
        column.name,
        column.issues.map((issue) => issue.name),
      ]),
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIssueboard(newBoard);
  }, [board]);

  if (!board) {
    return <Skeleton />;
  }
  return (
    <div className="h-full flex p-10 flex-col sm:flex-row sm:overflow-auto w-full sm:justify-center gap-10">
      <DragDropProvider
        onDragStart={(event) => {
          const sourceColumn = board.find(
            (col) => col.name === event.operation.source?.data.columnId,
          );
          const issue = sourceColumn?.issues.find(
            (issue) => issue === event.operation.source?.data.issue,
          );
          if (issue) setCurrentIssue(issue);
        }}
        onDragOver={(event) => {
          setIssueboard((items) => {
            if (!items) {
              return items;
            }
            return move(items, event);
          });
        }}
        onDragEnd={async (event) => {
          const targetColumn = board.find(
            (col) => col.name === event.operation.target?.data.columnId,
          );
          const stateId = targetColumn?.id;
          await updateIssue({
            id: Number(currentIssue?.id),
            stateId: Number(stateId),
          });
        }}
      >
        {issueBoard ? (
          Object.entries(issueBoard).map(([column, items]) => (
            <Droppable key={column} id={column} containedNumbers={items.length}>
              {items.map((id, index) => (
                <Draggable
                  id={id}
                  issue={
                    board
                      .find((col) =>
                        col.issues.some((issue) => issue.name === id),
                      )
                      ?.issues.find((issue) => issue.name === id) ?? {
                      id: -1,
                      name: "",
                      assignedTo: { name: "" },
                    }
                  }
                  key={id}
                  index={index}
                  column={column}
                />
              ))}
              <div className="mb-4 mt-4 flex flex-row justify-center">
                <Button
                  icon={<Add size="24" className="text-foreground" />}
                  size={"small"}
                  primary={true}
                />
              </div>
            </Droppable>
          ))
        ) : (
          <></>
        )}
      </DragDropProvider>
    </div>
  );
}
export default checkAuth(IssueBoard);
