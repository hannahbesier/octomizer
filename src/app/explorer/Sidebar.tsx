"use client";

import Button from "@/components/Button";
import {
  CaretDown,
  CaretRight,
  OpenPanelFilledLeft,
} from "@carbon/icons-react";

import { useGetFeatureQuery } from "@/store/api/api";
import { FeatureTable, ProjectData } from "@/store/types";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrentExpanded,
  currentExpanded,
  explorerContent,
  setExplorerContent,
} from "@/store/store";

function Feature({ featureId, setSideBar, mobile, }: { featureId: number; setSideBar: (arg0: boolean) => void; mobile: boolean; }) {
  const { data: featureQuery, isLoading: featureIsLoading } =
    useGetFeatureQuery(featureId);
  const dispatch = useDispatch();
  const currentExpandedSelector = useSelector(currentExpanded);
  const contentSelector = useSelector(explorerContent);
  if (featureIsLoading) return <></>;
  const isExpanded = currentExpandedSelector?.includes(featureQuery.id);

  return (
    <div className="flex flex-col">
      <div key={featureQuery.id} className="flex items-center">
        <Button
          aria-label={isExpanded ? "Collapse" : "Expand"}
          primary={true}
          size="small"
          disabled={featureQuery.children.length === 0}
          icon={
            featureQuery.children.length !== 0 ? (
              isExpanded ? (
                <CaretDown size="16" className="text-foreground" />
              ) : (
                <CaretRight size="16" className="text-foreground" />
              )
            ) : (
              <CaretRight size="16" className="invisible" />
            )
          }
          onClick={() => {
            dispatch(addCurrentExpanded(featureQuery.id));
          }}
        />
        <button
          className={`flex items-center h-8 sm:fit rounded-sm pl-1 w-full cursor-pointer hover:bg-hover ${contentSelector === featureId ? "bg-hover" : ""}`}
          key={featureQuery.id}
          onClick={() => {dispatch(setExplorerContent(featureQuery.id)); if (mobile) setSideBar(false);}}
        >
          {featureQuery.name}
        </button>
      </div>
      <div className="flex flex-col pl-2">
        {isExpanded ? (
          featureQuery.children.map((child: FeatureTable) => (
            <Feature key={child.id} featureId={child.id} setSideBar={setSideBar} mobile={mobile}/>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
type SidebarProps = {
  sideBar: boolean;
  setSideBar: (arg0: boolean) => void;
  project: ProjectData;
  mobile: boolean;
};
export default function Sidebar({
  sideBar,
  setSideBar,
  project,
  mobile,
}: SidebarProps) {
  return (
    <aside
      data-overlay={mobile && sideBar}
      data-open={sideBar}
      className="
      data-[overlay=true]:absolute data-[overlay=true]:right-5 data-[overlay=true]:top-25 data-[overlay=true]:left-5 data-[overlay=true]:bottom-5 data-[overlay=true]:z-2 data-[overlay=true]:block 
      md:block hidden md:data-[open=false]:hidden md:data-[open=true]:block
      md:w-100 shadow dark:shadow-darkmode bg-secondary rounded-sm p-2  fixed left-10 bottom-5 top-25"
    >
      <div className="flex flex-col pl-2 pr-2 p-1 gap-2">
        <div className="flex flex-row items-center w-full">
          <div className="w-full">{project ? project.name : <></>}</div>
          {sideBar ? (
            <Button
              aria-label="Close project tree"
              primary={true}
              icon={
                <OpenPanelFilledLeft size="24" className="text-foreground" />
              }
              onClick={() => setSideBar(false)}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col">
          {project ? (
            project.features.map((feature) => (
              <Feature key={feature.id} featureId={feature.id} setSideBar={setSideBar} mobile={mobile}/>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </aside>
  );
}
