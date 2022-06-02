import classes from "./scss/users.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Users = ({ users, userInfo, setIsActiveChat, setOppositeID }) => {
  return (
    <div className={classes.container}>
      <h3 className={classes.user_text}>{userInfo?.userName}</h3>
      <div className={classes.user_wrapper}>
        {users?.map((user) => {
          return (
            <div
              className={classes.persons}
              key={user.userName}
              onClick={() => {
                setIsActiveChat(true);
                setOppositeID(user.id);
              }}
            >
              <div className={classes.left_side}>
                <AccountCircleIcon className={classes.icon} />
                <div className={classes.icon_on_line}>
                  <div
                    className={classes.icon_on_line_inner}
                    style={{ backgroundColor: user.isOnline && "green" }}
                  />
                </div>
              </div>
              <p>{user.userName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
