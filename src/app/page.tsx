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
import Image from "next/image";
import { useSelector } from "react-redux";
import { user } from "@/store/store";
export default function Home() {
  const currentUser: { id: number | undefined, name: string | undefined } = useSelector(user);
  const { data: issues, isLoading: issueIsLoading } = useGetIssuesQuery<
    Record<string, IssueTable[]>
  >(currentUser?.id ?? 0);
  const { data: users, isLoading: userIsLoading } = useGetUsersQuery();
  const router = useRouter();
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
        <Card title="Issue Edit"><p>Edit and describe issues via Markdown, setting out who is assigned to them, which project they are part of, and their defined story points and tags.</p></Card>
        <Card title="Team Board"><p>View the current issues sorted by state in your daily scrum ('To-do', 'Busy' and 'Done') and drag and drop issues to change their state.</p></Card>
        <Card title="My Issues"><p>Users' specific views: current to-do and busy issues, team members.</p></Card>
        <Card title="Projects"><p>Use an explorer to organize and document your projects, features and issues in a tree-hierarchy structure.</p></Card>
      </div>
      <div className=" shadow dark:shadow-darkmode max-w-[60%] max-h-[60%]">

        <Image
          src="/img/IssueEditWhite.png"
          alt="Issue Edit Example"
          width={1919}
          height={1079}
          fetchPriority="high"
          loading="eager"
          sizes="(min-width: 640px) 760px"
          className="hidden sm:block dark:sm:hidden h-full w-full"
        />
        <Image
          src="/img/IssueEditMobile.png"
          alt="Issue Edit Example"
          width={391}
          height={852}
          fetchPriority="high"
          loading="eager"
          sizes="(min-width: 640px) 760px"
          className="block sm:hidden dark:hidden h-full w-full"
        />
        <Image
          src="/img/IssueBoardBlackMobile.png"
          alt="Issue Edit Example"
          width={393}
          height={850}
          fetchPriority="high"
          loading="eager"
          sizes="(min-width: 640px) 760px"
          className="hidden dark:block dark:sm:hidden h-full w-full"
        />
        <Image
          src="/img/IssueBoardBlack.png"
          alt="Issue Edit Example"
          width={1919}
          height={1079}
          fetchPriority="high"
          loading="eager"
          sizes="(min-width: 640px) 760px"
          className="hidden dark:hidden dark:sm:block h-full w-full"
        />

      </div>
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
