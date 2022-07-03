import { useState, useContext } from "react";
import { OppositUserContext, SocketContext } from "../../context";
import { EuiFlexGroup, EuiFlexItem, EuiIcon, EuiTextArea } from "@elastic/eui";
import classes from "./scss/send-massage.module.scss";

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
    <EuiFlexGroup
      alignItems="center"
      justifyContent="center"
      className={classes.flex_box}
    >
      <EuiFlexItem>
        <EuiTextArea
          placeholder="Placeholder text"
          aria-label="Send massage"
          fullWidth
          compressed
          value={massage}
          onChange={(e) => setMassage(e.target.value)}
        />
      </EuiFlexItem>
      <EuiFlexItem
        grow={false}
        onClick={() => handleSubmitBtn()}
        className={classes.icon}
      >
        <EuiIcon type="arrowRight" className={classes.item} />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default SendMassage;
