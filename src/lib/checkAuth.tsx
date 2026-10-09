import Skeleton from "@/components/Skeleton";
import { useGetUserQuery } from "@/store/api/api";
import { sessionId } from "@/store/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { redirect } from "next/navigation";
import { ComponentType, useEffect } from "react";
import { useSelector } from "react-redux";

export default function checkAuth<P extends object>(
  Component: ComponentType<P>,
) {
  return function ProtectedComponent(props: P) {
    const sessionIdSelector = useSelector(sessionId);
    const { data: currentUser } = useGetUserQuery(
      sessionIdSelector ?? skipToken,
    );
    useEffect(() => {}, [sessionIdSelector]);
    useEffect(() => {
      if (!currentUser) {
        const timer = setTimeout(() => {
          if (!currentUser) {
            redirect("/");
          }
        }, 3000);

        return () => clearTimeout(timer);
      }
    }, [currentUser]);

    if (!currentUser) return <Skeleton />;
    return <Component {...props} />;
  };
}
