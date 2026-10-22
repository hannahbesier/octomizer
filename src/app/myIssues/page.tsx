"use client";
import Table, { Column } from "../../components/Table";
import { useGetIssuesQuery, useGetUserQuery } from "@/store/api/api";
import { IssueTable } from "@/store/types";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { Launch } from "@carbon/icons-react";
import Skeleton from "@/components/Skeleton";
import useMobile from "../../lib/useMobile";
import checkAuth from "@/lib/checkAuth";

function MyIssues() {
  const { data: currentUser } = useGetUserQuery();
  const { data: issues, isLoading: issueIsLoading } = useGetIssuesQuery<
    Record<string, IssueTable[]>
  >(currentUser?.id ?? 0);
  const mobile = useMobile();
  const router = useRouter();
  const columnIssue: Column<IssueTable>[] = [
    {
      key: "name",
      label: "Issue name",
    },
    {
      key: "assignedTo",
      label: "Assigned to",
      render: (_, issue) => issue.assignedTo?.name,
    },
    {
      key: "state",
      label: "State",
      render: (value, issue) => issue.state?.name,
    },
    {
      key: "open",
      label: "",
      render: (_, issue) => (
        <Button
          aria-label="Open issue edit"
          primary={true}
          icon={<Launch size="16" className="text-foreground" />}
          onClick={() => {
            router.push(`/explorer/issueEdit?issueId=${issue.id}`);
          }}
        />
      ),
    },
  ];
  if (issueIsLoading) return <Skeleton />;
  return (
    <div className="flex flex-col">
      <h1 className="pb-2 p-10 text-xl">{"My issues: " + issues.length}</h1>
      <div className="pl-10 pr-10 p-4">
        <Table column={columnIssue} data={issues} mobile={mobile} />
      </div>
    </div>
  );
}
export default checkAuth(MyIssues);
