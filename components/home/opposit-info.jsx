import CloseIcon from "@mui/icons-material/Close";
import classes from "./scss/opposit-info.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";

const OppositInfo = ({ users, oppositID, setIsActiveChat }) => {
  const [oppositUser, setOppositUser] = useState();
  useEffect(() => {
    users.map((user) => {
      if (user.id == oppositID) return setOppositUser(user);
    });
  }, [users, oppositID]);

  return (
    <div className={classes.container}>
      <div className={classes.user_box}>
        <AccountCircleIcon className={classes.user_box_icon} />
        <div>
          <h4>{oppositUser?.userName}</h4>
          <p>{oppositUser?.isOnline ? "online" : "offline"}</p>
        </div>
      </div>
      <CloseIcon onClick={() => setIsActiveChat(false)} />
    </div>
  );
};

export default OppositInfo;
