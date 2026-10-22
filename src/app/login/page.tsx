"use client";
import Button from "@/components/Button";
import Textfield from "@/components/Textfield";
import {
  useUpdateSessionMutation,
  useDeleteSessionMutation,
  useGetUserQuery,
  api,
} from "@/store/api/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsAuth } from "@/store/store";
import { redirect, useRouter } from "next/navigation";
import LoadingSpin from "@/components/LoadingSpin";

export default function Login() {
  const [updateSession, { isLoading }] = useUpdateSessionMutation();
  const [deleteSession] = useDeleteSessionMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: currentUser } = useGetUserQuery();
  async function handleLogin() {
    try {
      setLoginError(false);
      const result = await updateSession({
        username: username,
        password: password,
      }).unwrap();
      if (result) {

        dispatch(api.util.invalidateTags(["User"]));
        dispatch(setIsAuth(true));
        setUsername("");
        setPassword("");
        setTimeout(() => {
          redirect("/");
        }, 1000);
      }
    } catch (error) {
      if (error) setLoginError(true);
    }
  }
  async function handleLogout() {
    try {
      await deleteSession({}).unwrap();
      dispatch(setIsAuth(false));
      dispatch(api.util.resetApiState());
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex h-1/3 items-center justify-center ">
      <div className="flex flex-col gap-8 w-100 items-center">
        {currentUser ? (
          <div className="flex flex-col pt-30 gap-8 items-center">
            {currentUser === null ? (
              <></>
            ) : (
              <h1 className="text-xl sm:text-3xl">
                {"Welcome back, " + currentUser?.name}
              </h1>
            )}
            <Button
              label="Logout"
              primary={true}
              onClick={() => handleLogout()}
            />
          </div>
        ) : (
          <div className="flex flex-col pt-30 gap-8 w-60 sm:w-100 items-center">
            <h1 className="text-3xl">Login</h1>
            <Textfield
              label="Email"
              value={username}
              setValue={(value) => setUsername(value)}
              valable={!loginError}
            />
            <Textfield
              label="Password"
              value={password}
              setValue={(value) => setPassword(value)}
              valable={!loginError}
              password={true}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
            <div className="flex flex-row gap-4 items-center">
              <Button
                label="Login"
                primary={true}
                onClick={() => handleLogin()}
              />{isLoading ? <LoadingSpin /> : <></>}</div>
          </div>
        )}
      </div>
    </div>
  );
}
