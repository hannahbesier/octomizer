"use client";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import {
  useGetIssuesQuery,
  useGetUsersQuery,
} from "@/store/api/api";
import { IssueTable } from "@/store/types";
import { Launch } from "@carbon/icons-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { isDark, user } from "@/store/store";
import Slideshow from "@/components/Slideshow";
import useMobile from "@/lib/useMobile";
import { useState } from "react";
export default function Home() {
  const currentUser = useSelector(user);
  const { data: issues, isLoading: issueIsLoading } = useGetIssuesQuery<
    Record<string, IssueTable[]>
  >(currentUser?.id ?? 0);
  const [index, setIndex] = useState(0);
  const { data: users, isLoading: userIsLoading } = useGetUsersQuery();
  const router = useRouter();
  const mobile = useMobile();
  const isDarkSelector = useSelector(isDark);
  if (!currentUser.id) return (
    <div className="flex flex-col gap-10 sm:gap-15 h-full w-full items-center sm:justify-center ">
      <div className="flex flex-col md:flex-row md:items-end w-fit md:w-200 pb-0 p-10"><h1 className="flex-1 text-2xl sm:text-6xl text-primaryLight">Octomizer</h1><p className="text-md sm:text-lg">| on mobile and desktop, in light and dark mode</p></div>
      <div className="flex sm:flex-row sm:gap-10 flex-col text-xl sm:text-2xl w-fit pb-0 pt-0 p-10 sm:w-full justify-center">
        <p>{"plan |"}</p>
        <p>{"organize |"}</p>
        <p>{"document |"}</p>
        <p className="text-primaryLight">{"your dev projects"}</p>
      </div>
      <Button size="large" primary={true} label="Getting started" onClick={() => router.push("./login")} />
      <div className="pl-10 pr-10 sm:pl-10 sm:pr-10 md:pl-20 md:pr-20 lg:pl-20 lg:pr-20 xl:pl-40 xl:pr-40 flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10">
        <button className="cursor-pointer flex hover:bg-hover" onClick={() => setIndex(0)}>
          <Card active={index === 0} title="Issue Edit"><p>Edit and describe issues via Markdown, setting out who is assigned to them, which project they are part of, and their defined story points and tags.</p></Card>
        </button>
        <button className="cursor-pointer flex hover:bg-hover" onClick={() => setIndex(1)}>
          <Card active={index === 1} title="Team Board"><p>View the current issues sorted by state in your daily scrum ('To-do', 'Busy' and 'Done') and drag and drop issues to change their state.</p></Card>
        </button>
        <button className="cursor-pointer flex hover:bg-hover" onClick={() => setIndex(2)}>
          <Card active={index === 2} title="My Issues"><p>Users' specific views: current to-do and busy issues, team members.</p></Card>
        </button>
        <button className="cursor-pointer flex hover:bg-hover" onClick={() => setIndex(3)}>
          <Card active={index === 3} title="Projects"><p>Use an explorer to organize and document your projects, features and issues in a tree-hierarchy structure.</p></Card>
        </button>
      </div>
      {isDarkSelector ?
        (mobile === true) ?
          <Slideshow index={index} setIndex={setIndex} images={["/img/MIssueEditBlack.png", "/img/MTeamboardBlack.png", "/img/MHomeBlack.png", "/img/MProjectsBlack.png"]} />
          : <Slideshow index={index} setIndex={setIndex} images={["/img/IssueEditBlack.png", "/img/TeamboardBlack.png", "/img/HomeBlack.png", "/img/ProjectsBlack.png"]} />
        : (mobile === true) ?
          <Slideshow index={index} setIndex={setIndex} images={["/img/MIssueEditWhite.png", "/img/MTeamboardWhite.png", "/img/MHomeWhite.png", "/img/MProjectsWhite.png"]} />
          : <Slideshow index={index} setIndex={setIndex} images={["/img/IssueEditWhite.png", "/img/TeamboardWhite.png", "/img/HomeWhite.png", "/img/ProjectsWhite.png"]} />}
    </div>);
  if (issueIsLoading || userIsLoading) return <Skeleton />;
  return (
    <div className="w-full flex flex-col">
      <h1 className="flex p-10 text-xl justify-center w-full">
        {"Welcome " + currentUser.name}
      </h1>
      <div className="pl-10 pr-10 sm:pl-20 sm:pr-20 md:pl-40 md:pr-40 lg:pl-60 lg:pr-60 xl:pl-100 xl:pr-100 flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-10">
        <Card title={"My current issues"}>
          <div className="flex flex-wrap justify-center gap-2">
            {issues
              .filter((issue) => issue.state.name === "busy")
              .map((issue) => (
                //TODO: fix this, filter on server side
                <Button
                  primary={true}
                  key={issue.id}
                  label={issue.name}
                  icon={<Launch size="16" className="text-white" />}
                  size="medium"
                  onClick={() =>
                    router.push(`/explorer/issueEdit?issueId=${issue.id}`)
                  }
                />
              ))}
          </div>
        </Card>
        <Card title={"My team"}>
          <div className="flex flex-wrap gap-2">
            {users
              ?.filter((user) => user.id !== currentUser?.id)
              .map((user) => (
                <Button primary={true} key={user.id} label={user.name} size="medium" />
              ))}
          </div>
        </Card>
        <Card title={"My to-do issues"}>
          <div className="flex flex-wrap gap-2">
            {issues
              .filter((issue) => issue.state.name === "toDo")
              .map((issue) => (
                //TODO: fix this, filter on server side
                <Button
                  primary={true}
                  key={issue.id}
                  label={issue.name}
                  icon={<Launch size="16" className="text-white" />}
                  size="medium"
                  onClick={() =>
                    router.push(`/explorer/issueEdit?issueId=${issue.id}`)
                  }
                />
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
