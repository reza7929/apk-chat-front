import { api_backend } from "./constance";
import Router from "next/router";
import axios from "axios";

export const checkAuth = async (setIsPageReady) => {
  if (typeof window === "undefined") return;
  try {
    await axios.post(api_backend + "/auth", {
      token: window.localStorage.getItem("token"),
    });
    return setIsPageReady(true);
  } catch (err) {
    console.log(err);
    return Router.push("/login");
  }
};
