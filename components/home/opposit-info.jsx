import CloseIcon from "@mui/icons-material/Close";
import classes from "./scss/opposit-info.module.scss";

const OppositInfo = ({ users, oppositID = { oppositID }, setIsActiveChat }) => {
  return (
    <div className={classes.container}>
      <h4 className={classes.header_text}>
        {users.map((user) => {
          if (user.id == oppositID) return user.userName;
        })}
      </h4>
      <CloseIcon onClick={() => setIsActiveChat(false)} />
    </div>
  );
};

export default OppositInfo;
