import AllMassages from "./all-massages";
import SendMassage from "./send-massage";
import classes from "./scss/chat-section.module.scss";
import OppositInfo from "./opposit-info";

const ChatSection = ({
  socket,
  users,
  isActiveChat,
  setIsActiveChat,
  oppositID,
}) => {
  if (isActiveChat)
    return (
      <div className={classes.chat}>
        <OppositInfo
          users={users}
          oppositID={oppositID}
          setIsActiveChat={setIsActiveChat}
        />
        <AllMassages socket={socket} oppositID={oppositID} />
        <SendMassage socket={socket} oppositID={oppositID} />
      </div>
    );

  return (
    <div className={classes.container}>
      <div className={classes.select_chat}>
        {users.length == 1 ? (
          <p className={classes.info_text}>
            سلام، شما تنها فرد ثبت نام کرده در این برنامه هستید. از انجایی که
            این برنامه برای احراز هویت از توکن استفاده میکند پیشنهاد میشود برای
            تست این برنامه به عنوان کاربر دوم و ارسال و دریافت پیام ها از مرورگر
            دیگر ثبت نام کرده و وارد شوید. تمام توضیحات در فایل README.md موجود
            میباشد.
          </p>
        ) : (
          <p className={classes.info_text}>
            برای شروع گفتگو لطفا یکی از کاربران مقابل را انتخاب کنید
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatSection;
