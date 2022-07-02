import { useState, useContext } from "react";
import { OppositUserContext, SocketContext } from "../../context";
import { EuiFlexGroup, EuiFlexItem, EuiIcon, EuiTextArea } from "@elastic/eui";

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
      style={{ width: "95%", margin: "auto" }}
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
      <EuiFlexItem grow={false} onClick={() => handleSubmitBtn()}>
        <EuiIcon type="arrowRight" />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default SendMassage;
