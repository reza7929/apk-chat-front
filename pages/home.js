import axios from "axios";
import { useState, useEffect } from "react";
import { api_backend } from "../utils/constance";
import jwt_decode from "jwt-decode";
import HomeLayout from "../layouts/home-layout";
import io from "socket.io-client";
import Users from "../components/home/users";
import ChatSection from "../components/home/chat-section";
import { socketIO } from "../utils/socket-io";

export default function Home() {
  const [usersData, setUsersData] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [isActiveChat, setIsActiveChat] = useState(false);
  const [oppositID, setOppositeID] = useState();
  const [isPageReady, setIsPageReady] = useState(false);
  const socket = socketIO();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setUserInfo(decoded);
    socket.emit("allUsers");
    socket.on("allUsersRes", (users) => {
      setUsersData(users);
      console.log(usersData);
    });
  }, []);
  const removeElement = (array, elem) => {
    let newData = [];
    array.map((item) => {
      if (item.userName != elem) newData.push(item);
    });

    return newData;
  };

  return (
    <HomeLayout>
      <Users
        users={removeElement(usersData, userInfo?.userName)}
        userInfo={userInfo}
        setIsActiveChat={setIsActiveChat}
        setOppositeID={setOppositeID}
      />
      <ChatSection
        users={usersData}
        socket={socket}
        isActiveChat={isActiveChat}
        setIsActiveChat={setIsActiveChat}
        oppositID={oppositID}
      />
    </HomeLayout>
  );
}
