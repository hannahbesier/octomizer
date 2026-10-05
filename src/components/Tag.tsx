import { Close } from "@carbon/icons-react";
import Button from "./Button";
type TagProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    tag: string,
}
export default function Tag({tag, ...props}: TagProps) {
    return(
        <div
              className="flex flex-row w-fit bg-primary text-white rounded-sm pl-1 gap-1 shadow dark:shadow-darkmode *:hover:bg-[#5b73bb]"
              key={tag}
            >
              {tag}
              <Button
                primary={true}
                size="small"
                icon={<Close size="16" className="text-white" />}
                {...props}
              />
            </div>
    );

}