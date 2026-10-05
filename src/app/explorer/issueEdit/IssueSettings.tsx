import Button from "@/components/Button";
import DropdownSearch from "@/components/DropdownSearch";
import Tag from "@/components/Tag";
import Textfield from "@/components/Textfield";
import { Add, Close, OpenPanelFilledRight } from "@carbon/icons-react";
import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import {
  useGetProjectsQuery,
  useGetStatesQuery,
  useGetTagsQuery,
  useGetUsersQuery,
  useUpdateIssueMutation,
} from "@/store/api/api";
import { IssueData } from "@/store/types";
type IssueSettingsProps = {
  mobile: boolean;
  openSettings: boolean;
  issue: IssueData;
  setOpenSettings: Dispatch<SetStateAction<boolean>>;
  addTags: boolean;
  setAddTags: (arg0: boolean) => void;
};
const IssueSettings = ({
  mobile,
  openSettings,
  issue,
  setOpenSettings,
  addTags,
  setAddTags,
  ...props
}: IssueSettingsProps) => {
  const { data: projects } = useGetProjectsQuery();
  const { data: users } = useGetUsersQuery();
  const { data: states } = useGetStatesQuery();
  const { data: tags } = useGetTagsQuery();
  const [updateIssue] = useUpdateIssueMutation({
    fixedCacheKey: "shared-update-post",
  });
  const [storypoints, setStorypoints] = useState("");
  const [assignedToState, setAssignedToState] = useState(
    issue.assignedTo?.name,
  );
  const [stateState, setStateState] = useState(issue.state?.name);
  const [projectState, setProjectState] = useState(issue.project?.name);
  const [tagsState, setTagsState] = useState(issue.tags);
  useEffect(() => {
    if (issue && issue.storypoints)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStorypoints(issue.storypoints.toString());
  }, [issue]);
  return (
    <aside
      data-overlay={mobile && openSettings}
      data-open={openSettings}
      className="data-[overlay=true]:absolute data-[overlay=true]:right-5 data-[overlay=true]:top-25 data-[overlay=true]:left-5 data-[overlay=true]:bottom-5 data-[overlay=true]:z-50 data-[overlay=true]:block 
       md:block hidden md:data-[open=false]:hidden md:data-[open=true]:block
      md:w-100 shadow dark:shadow-darkmode bg-secondary rounded-sm pt-2 p-4"
      {...props}
    >
      <div className=" flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-base w-full">
            {mobile ? issue.name : "Issue settings"}{" "}
          </h1>
          <Button
            primary={true}
            size="medium"
            icon={
              <OpenPanelFilledRight
                size="20"
                className="text-foreground"
                onClick={() => setOpenSettings(false)}
              />
            }
          />
        </div>
        <DropdownSearch
          label="assignedTo"
          currentValue={assignedToState ?? "none"}
          setCurrentValue={async (value: string) => {
            setAssignedToState(value);
            const assignedToId =
              users?.find((user) => user.name === value)?.id ??
              issue.assignedTo?.id;
            await updateIssue({ id: issue.id, assignedToId });
          }}
          options={users ? users.map((user) => user.name) : []}
        />
        <DropdownSearch
          label="state"
          currentValue={stateState ?? "none"}
          setCurrentValue={async (value: string) => {
            setStateState(value);
            const stateId =
              states?.find((state) => state.name === value)?.id ??
              issue.state?.id;
            await updateIssue({ id: issue.id, stateId });
          }}
          options={states?.map((state) => state.name) ?? []}
        />
        <DropdownSearch
          label="project"
          currentValue={projectState ?? "none"}
          setCurrentValue={async (value: string) => {
            setProjectState(value);
            const projectId =
              projects?.find((project) => project.name === value)?.id ??
              issue.project?.id;
            await updateIssue({ id: issue.id, projectId });
          }}
          options={projects ? projects.map((project) => project.name) : []}
        />
        <Textfield
          label="Storypoints"
          value={storypoints ?? "none"}
          setValue={(value: string) => setStorypoints(value)}
          onBlur={async (e: React.FocusEvent<HTMLInputElement>) =>
            await updateIssue({
              id: issue.id,
              storypoints: Number(e.target.value),
            })
          }
          valable={!Number.isNaN(storypoints)}
        />

        <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
          {!tagsState ? (
            <></>
          ) : (
            tagsState.map((tag) => (
              <Tag
                key={tag.id}
                tag={tag.name}
                onClick={async () => {
                  setTagsState((prevItem) => {
                    const newTagsState = prevItem?.filter(
                      (item) => item.id !== tag.id,
                    );
                    if (!newTagsState) return prevItem;
                    return [...newTagsState];
                  });
                  await updateIssue({
                    id: issue.id,
                    tags: [
                      ...(tagsState
                        ?.map((tag) => tag.id)
                        .filter((id) => id !== tag.id) ?? []),
                    ],
                  });
                }}
              />
            ))
          )}
          <div className="flex flex-row gap-4 w-full">
            {addTags ? (
              <DropdownSearch
                label="tags"
                currentValue=""
                setCurrentValue={async (value: string) => {
                  setTagsState((prevItem) => {
                    const newTagsState = tags?.find(
                      (tag) => tag.name === value,
                    );
                    if (!newTagsState) return prevItem;
                    return [...(prevItem ?? []), newTagsState];
                  });
                  setAddTags(false);
                  await updateIssue({
                    id: issue.id,
                    tags: [
                      ...(tagsState?.map((tag) => tag.id) ?? []),
                      ...(tags?.find((tag) => tag.name === value)?.id !==
                      undefined
                        ? [tags?.find((tag) => tag.name === value)?.id]
                        : []),
                    ],
                  });
                }}
                options={
                  tags
                    ? tags
                        .filter(
                          (tagListElement) =>
                            !tagsState?.some(
                              (tag) => tag.id === tagListElement.id,
                            ),
                        )
                        .map((tag) => tag.name)
                    : []
                }
              />
            ) : (
              <></>
            )}
            <Button
              primary={false}
              size="medium"
              icon={
                addTags ? (
                  <Close size="20" className="text-foreground" />
                ) : (
                  <Add size="20" className="text-foreground" />
                )
              }
              onClick={() =>
                addTags === false ? setAddTags(true) : setAddTags(false)
              }
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
export default memo(IssueSettings);
