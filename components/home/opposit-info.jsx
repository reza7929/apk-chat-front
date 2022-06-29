import CloseIcon from "@mui/icons-material/Close";
import classes from "./scss/opposit-info.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useEffect, useState } from "react";
import {
  UserContext,
  OppositUserContext,
  SetisActiveChatContext,
} from "../../context";

const OppositInfo = () => {
  const [oppositUser, setOppositUser] = useState();
  const { users } = useContext(UserContext);
  const { oppositID } = useContext(OppositUserContext);
  const { setIsActiveChat } = useContext(SetisActiveChatContext);
  useEffect(() => {
    //get user info
    users.map((user) => {
      if (user.id == oppositID) return setOppositUser(user);
    });
  }, [users, oppositID]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.user_box}>
          <AccountCircleIcon className={classes.user_box_icon} />
          <div>
            {/* show user names */}
            <h4>{oppositUser?.userName}</h4>
            {/* check user is online or not */}
            <p>{oppositUser?.isOnline ? "online" : "offline"}</p>
          </div>
        </div>
        <CloseIcon onClick={() => setIsActiveChat(false)} />
      </div>
    </>
  );
};

export default OppositInfo;
