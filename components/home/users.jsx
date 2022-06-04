import classes from "./scss/users.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Users = ({ users, userInfo, setIsActiveChat, setOppositeID }) => {
  return (
    <div className={classes.container}>
      {/* current user-name */}
      <h3 className={classes.user_text}>{userInfo?.userName}</h3>
      <div className={classes.user_wrapper}>
        {users?.map((user) => {
          return (
            <div
              className={classes.persons}
              key={user.userName}
              onClick={() => {
                // active chat section
                setIsActiveChat(true);
                //save clicked user id
                setOppositeID(user.id);
              }}
            >
              <div className={classes.left_side}>
                <AccountCircleIcon className={classes.icon} />
                {/* show green circle if user is online */}
                <div className={classes.icon_on_line}>
                  <div
                    className={classes.icon_on_line_inner}
                    style={{ backgroundColor: user.isOnline && "green" }}
                  />
                </div>
              </div>
              {/* show other user names */}
              <p>{user.userName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
