"use client";
import Button from "@/components/Button";
import Skeleton from "@/components/Skeleton";
import checkAuth from "@/lib/checkAuth";
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
function Home() {
  const sessionIdSelector = useSelector(sessionId);
  const { data: currentUser } = useGetUserQuery(sessionIdSelector ?? skipToken);
  useEffect(() => {}, [sessionIdSelector]);

  const { data: issues, isLoading: issueIsLoading } = useGetIssuesQuery<
    Record<string, IssueTable[]>
  >(currentUser?.id ?? 0);
  const { data: users, isLoading: userIsLoading } = useGetUsersQuery();
  const router = useRouter();
  if (!currentUser) return null;
  if (issueIsLoading || userIsLoading) return <Skeleton />;
  return (
    <div className="w-full flex flex-col">
      <h1 className="flex p-10 text-xl justify-center w-full">
        {"Welcome " + currentUser.name}
      </h1>
      <div className="pl-10 pr-10 sm:pl-20 sm:pr-20 md:pl-40 md:pr-40 lg:pl-60 lg:pr-60 xl:pl-100 xl:pr-100 flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-10">
        <div className="flex flex-col items-center gap-4 shadow dark:shadow-darkmode min-h-50 p-4 rounded-sm">
          <h2 className="text-md sm:text-lg">Your current issues:</h2>
          <div className="flex flex-wrap gap-2">
            {issues
              .filter((issue) => issue.state.name === "busy")
              .map((issue) => (
                //TODO: fix this, filter on server side
                <Button
                  primary={true}
                  key={issue.id}
                  label={issue.name}
                  icon={<Launch size="16" className="text-white"/>}
                  size="medium"
                  onClick={() =>
                    router.push(`/explorer/issueEdit?issueId=${issue.id}`)
                  }
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 shadow dark:shadow-darkmode min-h-50 p-4 rounded-sm">
          <h2 className="text-md sm:text-lg">Your team:</h2>
          <div className="flex flex-wrap gap-2">
            {users
              ?.filter((user) => user.id !== currentUser?.id)
              .map((user) => (
                <Button primary={true} key={user.id} label={user.name} size="medium" />
              ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 shadow dark:shadow-darkmode min-h-50 p-4 rounded-sm">
          <h2 className="text-md sm:text-lg">Your to-do issues:</h2>
          <div className="flex flex-wrap gap-2">
            {issues
              .filter((issue) => issue.state.name === "toDo")
              .map((issue) => (
                //TODO: fix this, filter on server side
                <Button
                  primary={true}
                  key={issue.id}
                  label={issue.name}
                  icon={<Launch size="16" className="text-white"/>}
                  size="medium"
                  onClick={() =>
                    router.push(`/explorer/issueEdit?issueId=${issue.id}`)
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default checkAuth(Home);
