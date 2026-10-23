"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "@/store/api/api";
import { setUser } from "@/store/store";

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const { data: user } = useGetUserQuery();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);

  return null;
}
