import AllMassages from "./all-massages";
import SendMassage from "./send-massage";
import classes from "./scss/chat-section.module.scss";
import OppositInfo from "./opposit-info";

const ChatSection = ({ isActiveChat }) => {
  if (isActiveChat)
    return (
      <>
        <OppositInfo />
        <AllMassages />
        <SendMassage />
      </>
    );

  return (
    <div className={classes.container}>
      <div className={classes.select_chat}>
        <p className={classes.info_text}>
          برای شروع گفتگو لطفا یکی از کاربران مقابل را انتخاب کنید
        </p>
      </div>
    </div>
  );
};

export default ChatSection;
