import { Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import classes from "./scss/send-massage.module.scss";

const SendMassage = ({ socket, oppositID }) => {
  const [massage, setMassage] = useState();
  const handleSubmitBtn = () => {
    if (massage) {
      socket.emit("sendMessage", { massage, oppositID });
      socket.emit("allMassages", {
        oppositID,
      });
      return setMassage("");
    }
    alert("فیلد نمیتواند خالی باشد");
  };
  //   useEffect(() => {
  //     const listener = (event) => {
  //       if (event.code === "Enter" || event.code === "NumpadEnter") {
  //         event.preventDefault();
  //         handleSubmitBtn();
  //       }
  //     };
  //     document.addEventListener("keydown", listener);
  //     return () => {
  //       document.removeEventListener("keydown", listener);
  //     };
  //   }, []);

  return (
    <div className={classes.container}>
      <Input
        value={massage}
        onChange={(e) => setMassage(e.target.value)}
        className={classes.input}
      />
      <SendIcon onClick={() => handleSubmitBtn()} />
    </div>
  );
};

export default SendMassage;
