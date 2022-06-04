import { Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import classes from "./scss/send-massage.module.scss";

const SendMassage = ({ socket, oppositID }) => {
  const [massage, setMassage] = useState();
  const handleSubmitBtn = () => {
    if (massage) {
      // active send massage connection
      socket.emit("sendMessage", { massage, oppositID });
      socket.emit("allMassages", {
        oppositID,
      });
      return setMassage("");
    }
  };

  return (
    <div className={classes.container}>
      <Input
        disableUnderline
        multiline
        value={massage}
        onChange={(e) => setMassage(e.target.value)}
        className={classes.input}
      />
      <SendIcon onClick={() => handleSubmitBtn()} />
    </div>
  );
};

export default SendMassage;
