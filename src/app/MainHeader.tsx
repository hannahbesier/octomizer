import Toggle from "@/components/Toggle";
import {
  Asleep,
  IbmCloudTransitGateway,
  UserAvatar,
} from "@carbon/icons-react";
import { useSelector } from "react-redux";
import { sessionId } from "@/store/store";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/store/api/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
export default function MainHeader() {
  const sessionIdSelector = useSelector(sessionId);
  const { data: currentUser } = useGetUserQuery(sessionIdSelector ?? skipToken);
  const [dark, setDark] = useState(false);
  useEffect(() => {}, [sessionIdSelector]);
  useEffect(() => {
    const isDark = Cookies.get("theme") === "true";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const router = useRouter();
  return (
    <div className="flex pl-4 pr-4 sm:pl-10 sm:pr-10 p-2 w-full items-center bg-primary gap-4">
      <div className="flex flex-row gap-2 grow items-center">
        <IbmCloudTransitGateway size="20" className="text-white" />
        <h1 className="text-white">Ocotomizer</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Asleep size="20" className="text-white" />
        <Toggle
          checked={dark}
          onChange={(e) => {
            setDark(e.target.checked);
            document.documentElement.classList.toggle("dark", e.target.checked);
            Cookies.set("theme", e.target.checked.toString(), {
              expires: 7,
              secure: true,
              sameSite: "strict",
            });
          }}
        />
      </div>
      <Button
        className="flex flex-row gap-2 pl-2 pr-2 text-white bg-primary items-center cursor-pointer hover:shadow-darkmode rounded-sm"
        primary={true}
        size="small"
        mobileOnlyIcon={true}
        aria-label={sessionIdSelector === null ? "Log in" : "Your Profil"}
        label={
          sessionIdSelector === null ? "Log in" : (currentUser?.name ?? "")
        }
        icon={<UserAvatar size="20" className="text-white" />}
        onClick={() => router.push("/login")}
      />
    </div>
  );
}
