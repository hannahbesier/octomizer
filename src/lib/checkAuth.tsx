import Skeleton from "@/components/Skeleton";
import { useGetUserQuery } from "@/store/api/api";
import { redirect } from "next/navigation";
import { ComponentType, useEffect } from "react";

export default function checkAuth<P extends object>(
  Component: ComponentType<P>,
) {
  return function ProtectedComponent(props: P) {
    const { data: currentUser } = useGetUserQuery();
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
