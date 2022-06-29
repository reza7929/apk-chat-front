import { Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useContext } from "react";
import classes from "./scss/send-massage.module.scss";
import { OppositUserContext, SocketContext } from "../../context";

const SendMassage = () => {
  const [massage, setMassage] = useState();
  const { socket } = useContext(SocketContext);
  const { oppositID } = useContext(OppositUserContext);
  const handleSubmitBtn = async () => {
    if (massage) {
      // active send massage connection
      socket.emit("sendMessage", { massage, oppositID });
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
