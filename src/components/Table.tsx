import { useState } from "react";
import Button from "./Button";
import { CaretDown, CaretRight } from "@carbon/icons-react";

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};
export type TableProps<T> = {
  column: Column<T>[];
  data: T[];
  mobile?: boolean;
};
export default function Table<T>({ column, data, mobile }: TableProps<T>) {
  return (
    <table className=" p-1 w-full ">
      <tbody>
        {data?.map((element, rowIndex) => (
          <tr
            key={rowIndex}
            className="h-8 items-center flex gap-4 w-full h-full bg-secondary hover:bg-hover p-1 pl-4 pr-4 first:rounded-t-sm last:rounded-b-sm shadow-inset dark:shadow-insetDarkmode"
          >
            {mobile ? (
              <td className="w-full">
                <MobileRow element={element} column={column} />
              </td>
            ) : (
              column.map((col, colIndex) => (
                <td
                  key={`${String(col.key)}-${colIndex}`}
                  className="h-full w-full whitespace-nowrap sm:basis-1/4 basis-none sm:block first:basis-1/2 first:grow last:basis-1/16 first:block last:block hidden"
                >
                  {col.render
                    ? col.render(element[col.key], element)
                    : String(element[col.key])}
                </td>
              ))
            )}
            {mobile ? (
              <td>
                {(() => {
                  const col = column.find((col) => col.key === "open");
                  return (
                    <div>
                      {col?.render ? (
                        col.render(element[col.key], element)
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })()}
              </td>
            ) : (
              <></>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
function MobileRow<T>({
  element,
  column,
}: {
  element: T;
  column: Column<T>[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <div className="flex flex-row gap-2 w-full">
        <Button
          primary={true}
          size="small"
          icon={
            isExpanded ? (
              <CaretDown size="16" className="text-foreground" />
            ) : (
              <CaretRight size="16" className="text-foreground" />
            )
          }
          onClick={() => {
            return isExpanded ? setIsExpanded(false) : setIsExpanded(true);
          }}
        />
        <div>{String(element[column[0].key])}</div>
      </div>

      {isExpanded && (
        <div className="flex flex-col pl-10">
          {column.slice(1).map((col, index) => {
            const value = element[col.key];

            if (value === undefined || value === null) {
              return null;
            }

            return (
              <div key={`${String(col.key)}-${index}`}>
                {String(col.key)}:{" "}
                {col.render ? col.render(value, element) : String(value)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
