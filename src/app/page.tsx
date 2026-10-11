"use client";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import {
  useGetIssuesQuery,
  useGetUserQuery,
  useGetUsersQuery,
} from "@/store/api/api";
import { sessionId } from "@/store/store";
import { IssueTable } from "@/store/types";
import { Launch } from "@carbon/icons-react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const sessionIdSelector = useSelector(sessionId);
  const { data: currentUser } = useGetUserQuery(sessionIdSelector ?? skipToken);
  useEffect(() => { }, [sessionIdSelector]);

  const { data: issues, isLoading: issueIsLoading } = useGetIssuesQuery<
    Record<string, IssueTable[]>
  >(currentUser?.id ?? 0);
  const { data: users, isLoading: userIsLoading } = useGetUsersQuery();
  const router = useRouter();
  if (!currentUser) return (
    <div className="flex flex-col gap-10 sm:gap-15 h-full w-full items-center sm:justify-center ">
      <div className="flex sm:flex-row sm:gap-10 flex-col text-2xl sm:text-4xl w-fit pb-0 p-10 sm:w-full justify-center">
        <p>{"plan |"}</p>
        <p>{"organize |"}</p>
        <p>{"document |"}</p>
        <p className="text-primaryLight">{"your dev projects"}</p>

      </div>

      <Button size="large" primary={true} label="Getting started" onClick={() => router.push("./login")} />
      <div className=" shadow dark:shadow-darkmode max-w-[60%] max-h-[60%]">
        <img src=".\img\IssueEditWhite.png" alt="Issue Edit Example" className="hidden sm:block dark:sm:hidden h-full w-full" />
        <img src=".\img\IssueEditMobile.png" alt="Issue Edit Example" className="block sm:hidden dark:hidden h-full w-full" />
        <img src=".\img\IssueBoardBlackMobile.png" alt="Issue Edit Example" className="hidden dark:block dark:sm:hidden h-full w-full" />
        <img src=".\img\IssueBoardBlack.png" alt="Issue Edit Example" className=" hidden dark:hidden dark:sm:block h-full w-full" />
      </div>
    </div>);
  if (issueIsLoading || userIsLoading) return <Skeleton />;
  return (
    <div className="w-full flex flex-col">
      <h1 className="flex p-10 text-xl justify-center w-full">
        {"Welcome " + currentUser.name}
      </h1>
      <div className="pl-10 pr-10 sm:pl-20 sm:pr-20 md:pl-40 md:pr-40 lg:pl-60 lg:pr-60 xl:pl-100 xl:pr-100 flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-10">
        <Card title={"Your current issues"}>
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
        <Card title={"Your team"}>
          <div className="flex flex-wrap gap-2">
            {users
              ?.filter((user) => user.id !== currentUser?.id)
              .map((user) => (
                <Button primary={true} key={user.id} label={user.name} size="medium" />
              ))}
          </div>
        </Card>
        <Card title={"Your to-do issue"}>
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
