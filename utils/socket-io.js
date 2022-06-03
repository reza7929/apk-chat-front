import jwt_decode from "jwt-decode";
import io from "socket.io-client";
import { api_backend } from "./constance";
import Router from "next/router";
import axios from "axios";

export const socketIO = async () => {
  if (typeof window === "undefined") return;
  const token = window.localStorage.getItem("token");
  if (!token) return await Router.push("/auth");
  try {
    await axios.post(api_backend + "/auth", {
      token: window.localStorage.getItem("token"),
    });
    const decoded = jwt_decode(token);
    const socket = io(api_backend, {
      query: `fromID=${decoded.id}`,
    });

    return socket;
  } catch (err) {
    console.log(err);
    return await Router.push("/auth");
  }
};
