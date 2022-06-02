import AllMassages from "./AllMassages";
import SendMassage from "./SendMassage";
import classes from "./scss/chat-section.module.scss";
import OppositInfo from "./opposit-info";
import { useEffect } from "react";

const ChatSection = ({
  socket,
  users,
  userInfo,
  isActiveChat,
  setIsActiveChat,
  oppositID,
}) => {
  useEffect(() => {
    console.log({ socket });
  }, [users]);
  return (
    <div className={classes.container}>
      {isActiveChat ? (
        <div className={classes.chat}>
          <OppositInfo
            users={users}
            oppositID={oppositID}
            setIsActiveChat={setIsActiveChat}
          />
          <AllMassages
            socket={socket}
            userInfo={userInfo}
            oppositID={oppositID}
          />
          <SendMassage socket={socket} oppositID={oppositID} />
        </div>
      ) : (
        <div className={classes.select_chat}>
          <p>برای شروع گفتگو لطفا یکی از کاربران مقابل را انتخاب کنید</p>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
