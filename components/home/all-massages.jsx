import { EuiText, useEuiTheme, EuiTextColor } from "@elastic/eui";
import { useState, useEffect, useRef, useContext } from "react";
import { OppositUserContext, SocketContext } from "../../context";

const AllMassages = () => {
  const [massages, setMassages] = useState([]);
  const messagesEndRef = useRef();
  const { socket } = useContext(SocketContext);
  const { oppositID } = useContext(OppositUserContext);
  const { euiTheme } = useEuiTheme();
  useEffect(() => {
    // active all massage connection
    socket.emit("allMassages", {
      oppositID,
    });
    //send masssage on network
    socket.on("massagesRes", (massage) => {
      //add massage to massages
      if (massage) setMassages((massages) => [...massages, ...massage]);
      // setTimeout(() => {
      //   scrollToBottom();
      // }, 500);
    });
    return () => {
      // empty massages
      setMassages([]);
      //close socket connection
      if (oppositID) socket.emit("leaveRoom", { oppositID });
    };
  }, [oppositID]);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  //convert timestamp to time
  const getTime = (time) => {
    const date = new Date(time);
    let kind = "AM";
    // Hours part from the timestamp
    let hours = date.getHours();
    if (hours == 0) hours = 12;
    else {
      if (hours > 11) kind = "PM";
      if (hours > 12) hours = hours - 12;
    }
    // Minutes part from the timestamp
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;

    return `${hours}:${minutes} ${kind}`;
  };

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="scroll box"
      className="eui-yScrollWithShadows"
      style={{ height: "100%" }}
    >
      {massages?.map((massage, index) => {
        const isOpposit = massage.fromID == oppositID;
        return (
          <>
            <EuiText
              css={{
                width: "fit-content",
                marginRight: isOpposit ? "auto" : "10px",
                marginLeft: isOpposit ? "10px" : "auto",
                marginTop: euiTheme.size.l,
                marginBottom: euiTheme.size.l,
                textAlign: isOpposit ? "left" : "right",
                background: isOpposit
                  ? euiTheme.colors.darkShade
                  : euiTheme.colors.lightShade,
                padding: euiTheme.size.m,
                borderRadius: euiTheme.size.m,
              }}
            >
              <p>
                <EuiTextColor color={isOpposit ? "white" : "#504848"}>
                  {massage.text}
                </EuiTextColor>
              </p>
              <p>
                <small>{getTime(massage.time)}</small>
              </p>
            </EuiText>
          </>
        );
      })}
    </div>
  );
};

export default AllMassages;
