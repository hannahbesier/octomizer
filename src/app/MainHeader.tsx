import Toggle from "@/components/Toggle";
import {
  Asleep,
  IbmCloudTransitGateway,
  UserAvatar,
} from "@carbon/icons-react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { user, setDarkTheme } from "@/store/store";

export default function MainHeader() {
  const currentUser: { id: number | undefined, name: string | undefined } = useSelector(user);
  const [dark, setDark] = useState(false);
  const dispatch = useDispatch();
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
        <h1 className="text-white">Octomizer</h1>
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
            dispatch(setDarkTheme(e.target.checked));
          }}
        />
      </div>
      <Button
        className="flex flex-row gap-2 pl-2 pr-2 text-white bg-primary items-center cursor-pointer hover:shadow-darkmode rounded-sm"
        primary={true}
        size="small"
        mobileOnlyIcon={true}
        aria-label={(currentUser.id === undefined) ? "Log in" : "Your Profil"}
        label={
          currentUser.id === undefined ? "Log in" : (currentUser?.name ?? "")
        }
        icon={<UserAvatar size="20" className="text-white" />}
        onClick={() => router.push("/login")}
      />
    </div>
  );
}