"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setSessionId } from "@/store/store";
import { useGetIsAuthQuery } from "@/store/api/api";

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const sessionId = Cookies.get("sessionId");

  const { data: isAuth, isSuccess } = useGetIsAuthQuery(sessionId ?? "", {
    skip: !sessionId,
  });

  useEffect(() => {
    if (isSuccess && isAuth && sessionId) {
      dispatch(setSessionId(sessionId));
    }
  }, [isAuth, isSuccess, sessionId, dispatch]);

  return null;
}
