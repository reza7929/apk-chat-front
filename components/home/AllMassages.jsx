import { useState, useEffect } from "react";
import { networkID } from "../../utils/network-id";
import classes from "./scss/all-massages.module.scss";

const AllMassages = ({ socket, userInfo, oppositID = 0 }) => {
  const [massages, setMassages] = useState([]);
  // console.log(massages);
  useEffect(() => {
    console.log({ oppositID });
    socket.emit("allMassages", {
      oppositID,
    });
    const netID = networkID(userInfo.id, oppositID);
    console.log({ netID });
    socket.on(netID, (massage) => {
      setMassages([]);
      if (massage) setMassages((massages) => [...massages, ...massage]);
    });
    return () => {
      socket.off(netID);
    };
  }, [oppositID]);

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
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AllMassages;
