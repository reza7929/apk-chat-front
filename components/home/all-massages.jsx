import { useState, useEffect, useRef } from "react";
import { networkID } from "../../utils/network-id";
import classes from "./scss/all-massages.module.scss";

const AllMassages = ({ socket, userInfo, oppositID = 0 }) => {
  const [massages, setMassages] = useState([]);
  const messagesEndRef = useRef();
  useEffect(() => {
    // active all massage connection
    socket.emit("allMassages", {
      oppositID,
    });
    // create network id to show massages
    const netID = networkID(userInfo.id, oppositID);
    //send masssage on network
    socket.on(netID, (massage) => {
      setMassages([]);
      if (massage) setMassages((massages) => [...massages, ...massage]);
      scrollToBottom();
    });
    return () => {
      socket.off(netID);
    };
  }, [oppositID]);
  const scrollToBottom = () => {
    console.log("scroll function");
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
    <div className={classes.container}>
      {massages?.map((massage, index) => {
        return (
          <div className={classes.massage_box} key={index}>
            <p
              className={`${classes.massage_box_text} ${
                massage.fromID != oppositID
                  ? classes.user_side
                  : classes.opposit_side
              }`}
            >
              {massage.text}
              <br />
              <span className={classes.massage_box_time}>
                {/* convert time stamp to time */}
                {getTime(massage.time)}
              </span>
            </p>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default AllMassages;
