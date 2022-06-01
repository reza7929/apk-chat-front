import { useState, useEffect } from "react";
import classes from "./scss/all-massages.module.scss";

const AllMassages = ({ socket, oppositID }) => {
  const [massages, setMassages] = useState([]);
  console.log(massages);
  useEffect(() => {
    socket.emit("allMassages", {
      oppositID,
    });
    socket.on("allMassagesRes", (massage) => {
      setMassages([]);
      if (massage) setMassages((massages) => [...massages, ...massage]);
    });
  }, [oppositID]);

  return (
    <div className={classes.container}>
      {massages?.map((massage, index) => {
        console.log(massage);
        return (
          <div className={classes.massage_box}>
            <p
              key={index}
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
