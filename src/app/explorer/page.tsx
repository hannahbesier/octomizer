"use client";
import Button from "@/components/Button";
import DropdownSearch from "@/components/DropdownSearch";
import { Add, Launch, OpenPanelFilledLeft } from "@carbon/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Table, { Column } from "@/components/Table";
import {
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetFeatureQuery,
} from "@/store/api/api";
import { FeatureTable, IssueTable, ProjectData } from "@/store/types";
import Skeleton from "@/components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { explorerContent, setExplorerContent } from "@/store/store";
import useMobile from "../../lib/useMobile";
import checkAuth from "@/lib/checkAuth";

function Explorer() {
  const { data: projects } = useGetProjectsQuery();

  const [currentProject, setCurrentProject] = useState<number>(
    projects ? projects[0].id : 1,
  ); // TODO fix this 1
  const { data: project, isLoading: projectIsLoading } =
    useGetProjectQuery<Record<string, ProjectData>>(currentProject);
  const dispatch = useDispatch();
  const contentSelector = useSelector(explorerContent);
  const { data: feature } = useGetFeatureQuery(contentSelector);
  // const [mobile, setMobile] = useState(useMobile());
  const mobile = useMobile();
  const [sideBar, setSideBar] = useState(mobile ? false : true);
  const router = useRouter();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (mobile) setSideBar(false);
    else setSideBar(true);
  }, [mobile]);

  const columnIssue: Column<IssueTable>[] = [
    { key: "name", label: "Issue name" },
    {
      key: "assignedTo",
      label: "Assigned to",
      render: (_, issue) => issue.assignedTo.name,
    },
    {
      key: "state",
      label: "State",
      render: (value, issue) => issue.state.name,
    },
    {
      key: "open",
      label: "",
      render: (_, issue) => (
        <Button
          primary={true}
          icon={<Launch size="16" className="text-foreground" />}
          onClick={() => {
            router.push(`/explorer/issueEdit?issueId=${issue.id}`);
          }}
        />
      ),
    },
  ];
  const columnFeature: Column<FeatureTable>[] = [
    {
      key: "name",
      label: "Feature name",
      render: (_, feature) => (
        <button
          className="cursor-pointer whitespace-nowrap"
          onClick={() => dispatch(setExplorerContent(feature.id))}
        >
          {feature.name}
        </button>
      ),
    },
  ];
  if (projectIsLoading) return <Skeleton />;
  return (
    <div className="flex flex-col gap-4 p-10 h-full">
      <div className="flex flex-row gap-4 h-full">
        {sideBar ? (
          <Sidebar
            sideBar={sideBar}
            setSideBar={setSideBar}
            project={project}
            mobile={mobile}
          />
        ) : (
          <></>
        )}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-10 items-center">
            <div className="flex gap-4">
              {!sideBar ? (
                <div className="">
                  <Button
                    primary={false}
                    icon={
                      <OpenPanelFilledLeft
                        size="24"
                        className="text-foreground"
                      />
                    }
                    onClick={() => {
                      setSideBar(true);
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
              {projects ? (
                projects.map((project) => (
                  <Button
                    primary={project.id === currentProject}
                    key={project.id}
                    onClick={() => {
                      setCurrentProject(project.id);
                      dispatch(setExplorerContent(0));
                    }}
                    label={project.name}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <Button
              size="small"
              label="New"
              mobileOnlyIcon={true}
              icon={<Add size="20" className="text-foreground" />}
            />{" "}
            Search:
            <DropdownSearch
              currentValue="none"
              setCurrentValue={() => {}}
              options={["none", "prio", "assignedTo", "state"]}
            />
          </div>
          {projectIsLoading ? (
            <Skeleton />
          ) : (
            <div className="flex flex-col gap-1">
              <Table
                column={columnFeature}
                data={feature ? feature.children : project.features}
              />
              <Table
                column={columnIssue}
                data={feature ? feature.issues : project.issues}
                mobile={mobile}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default checkAuth(Explorer);
