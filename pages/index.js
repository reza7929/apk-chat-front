import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import HomeLayout from "../layouts/home-layout";
import Users from "../components/home/users";
import ChatSection from "../components/home/chat-section";
import { socketIO } from "../utils/socket-io";
import Head from "next/head";
import Loader from "../components/common/loader";

export default function Home() {
  const [usersData, setUsersData] = useState([]); //get all users info
  const [userInfo, setUserInfo] = useState(); //get current user info
  const [isActiveChat, setIsActiveChat] = useState(false); //check if chat section is active
  const [oppositID, setOppositeID] = useState(); //get the opposite user who is active his chat section
  const [isPageReady, setIsPageReady] = useState(false); //check if index page is ready to show
  //check-token & active socket-io
  const socket = socketIO();
  useEffect(() => {
    const token = localStorage.getItem("token");
    //check if token is exist
    if (!token) return;
    //decode token
    const decoded = jwt_decode(token);
    //save decode info
    setUserInfo(decoded);
    //active allUsers connection
    socket.emit("allUsers");
    socket.on("allUsersRes", (users) => {
      setUsersData(users);
    });
    setIsPageReady(true);
  }, []);
  //remove current user from list
  const removeElement = (array, elem) => {
    let newData = [];
    array.map((item) => {
      if (item.userName != elem) newData.push(item);
    });

    return newData;
  };

  if (!isPageReady) return <Loader />;

  return (
    <HomeLayout>
      <Head>
        <title>apk | چت</title>
        <meta name="description" content="پروژه تست چت" />
      </Head>

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
