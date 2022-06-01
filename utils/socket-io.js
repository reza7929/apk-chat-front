import jwt_decode from "jwt-decode";
import io from "socket.io-client";
import { api_backend } from "./constance";

export const socketIO = () => {
  if (typeof window === "undefined") return;
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const socket = io(api_backend, {
    query: `fromID=${decoded.id}`,
  });
  return socket;
};
