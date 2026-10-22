"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetIsAuthQuery } from "@/store/api/api";
import { setIsAuth } from "@/store/store";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  const { data: isAuth, isSuccess } = useGetIsAuthQuery();

  useEffect(() => {
    if (isSuccess && isAuth) {
      dispatch(setIsAuth(true));
    }
  }, [isAuth, isSuccess, dispatch]);

  return null;
}
