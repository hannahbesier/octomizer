"use client";
import Button from "@/components/Button";
import Textfield from "@/components/Textfield";
import {
  useUpdateSessionMutation,
  useDeleteSessionMutation,
  useGetUserQuery,
} from "@/store/api/api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { sessionId, setSessionId } from "@/store/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { redirect } from "next/navigation";
import LoadingSpin from "@/components/LoadingSpin";

export default function Login() {
  const [updateSession, {isLoading}] = useUpdateSessionMutation();
  const [deleteSession] = useDeleteSessionMutation();
  const sessionIdSelector = useSelector(sessionId);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();
  const { data: currentUser } = useGetUserQuery(sessionIdSelector ?? skipToken);
  useEffect(() => {}, [sessionIdSelector]);
  async function handleLogin() {
    try {
      setLoginError(false);
      const result = await updateSession({
        username: username,
        password: password,
      }).unwrap();
      if (result) {
        Cookies.set("sessionId", result.id, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        dispatch(setSessionId(result.id));
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
    const sessionId = Cookies.get("sessionId");

    try {
      if (sessionId) {
        await deleteSession({ sessionId }).unwrap();
      }

      Cookies.remove("sessionId");
      dispatch(setSessionId(null));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex h-1/3 items-center justify-center ">
      <div className="flex flex-col gap-8 w-100 items-center">
        {sessionIdSelector ? (
          <div className="flex flex-col pt-30 gap-8 items-center">
            {sessionIdSelector === null ? (
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
            />
            <div className="flex flex-row gap-4 items-center">
            <Button
              label="Login"
              primary={true}
              onClick={() => handleLogin()}
            />{isLoading ? <LoadingSpin/> : <></>}</div>
          </div>
        )}
      </div>
    </div>
  );
}
