import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Users from "../components/home/users";
import ChatSection from "../components/home/chat-section";
import { socketIO } from "../utils/socket-io";
import Head from "next/head";
import {
  OppositUserContextProvider,
  SetisActiveChatContextProvider,
  SocketContextProvider,
  UserContextProvider,
} from "../context";
import { EuiFlexGroup, EuiFlexItem, EuiLoadingSpinner } from "@elastic/eui";

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

  if (!isPageReady)
    return (
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <EuiFlexItem grow={false}>
          <EuiLoadingSpinner size="xxl" />
        </EuiFlexItem>
      </EuiFlexGroup>
    );

  return (
    <>
      <Head>
        <title>apk | چت</title>
        <meta name="description" content="پروژه تست چت" />
      </Head>
      <UserContextProvider users={usersData}>
        <SocketContextProvider socket={socket}>
          <OppositUserContextProvider oppositID={oppositID}>
            <SetisActiveChatContextProvider setIsActiveChat={setIsActiveChat}>
              <EuiFlexGroup style={{ height: "100%" }}>
                <EuiFlexItem
                  grow={1}
                  className={isActiveChat && "hide_on_mobile"}
                >
                  <Users
                    users={removeElement(usersData, userInfo?.userName)}
                    userInfo={userInfo}
                    setIsActiveChat={setIsActiveChat}
                    setOppositeID={setOppositeID}
                  />
                </EuiFlexItem>
                <EuiFlexItem grow={3}>
                  <ChatSection isActiveChat={isActiveChat} />
                </EuiFlexItem>
              </EuiFlexGroup>
            </SetisActiveChatContextProvider>
          </OppositUserContextProvider>
        </SocketContextProvider>
      </UserContextProvider>
    </>
  );
}
