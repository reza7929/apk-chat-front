import jwt_decode from "jwt-decode";
import io from "socket.io-client";
import { api_backend } from "./constance";
import Router from "next/router";
import axios from "axios";

const checkAuth = async (token) => {
  try {
    await axios.post(api_backend + "/auth", {
      token,
    });
  } catch (err) {
    console.log(err);
    return Router.push("/auth");
  }
};
export const socketIO = () => {
  if (typeof window === "undefined") return;
  //get token
  const token = window.localStorage.getItem("token");
  //check if token is empty
  if (!token) return Router.push("/auth");
  //check token validate
  checkAuth(token);
  //decode the token
  const decoded = jwt_decode(token);
  //active socket
  const socket = io(api_backend, {
    query: `fromID=${decoded.id}`,
  });

  return socket;
};
