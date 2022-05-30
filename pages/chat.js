import { api_backend } from "../utils/constance";
import io from "socket.io-client";
import SendMassage from "../components/chat/SendMassage";
import AllMassages from "../components/chat/AllMassages";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

export default function Chat() {
  const [userInfo, setUserInfo] = useState();
  const [oppositeUser, setOppositeUser] = useState();
  const router = useRouter();
  useEffect(() => {
    const getItem = async () => {
      const token = await localStorage.getItem("token");
      const decoded = await jwt_decode(token);
      setUserInfo(decoded);
    };
    getItem();
  }, []);

  useEffect(() => {
    const { id, userName } = router.query;
    setOppositeUser({ id, userName });
  }, [router.query]);

  if (!userInfo || !oppositeUser) return;

  const socket = io(api_backend, {
    query: `fromID=${userInfo.id}&toID=${oppositeUser.id}`,
  });

  return (
    <div>
      <h1>Chat with {oppositeUser.userName}</h1>
      <AllMassages socket={socket} />
      <SendMassage socket={socket} />
    </div>
  );
}
