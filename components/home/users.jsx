import {
  EuiTitle,
  EuiTextColor,
  EuiTextAlign,
  EuiAvatar,
  EuiFlexGroup,
  EuiIcon,
  EuiFlexItem,
  EuiText,
} from "@elastic/eui";
import classes from "./scss/users.module.scss";

const Users = ({ users, userInfo, setIsActiveChat, setOppositeID }) => {
  return (
    <>
      {/* current user-name */}
      <EuiTitle>
        <EuiTextAlign textAlign="center">
          <h2>
            <EuiTextColor color="success">{userInfo?.userName}</EuiTextColor>
          </h2>
        </EuiTextAlign>
      </EuiTitle>
      <div
        tabIndex={0}
        role="region"
        aria-label="scroll box"
        className="eui-yScrollWithShadows"
      >
        {users?.map((user) => {
          return (
            <EuiFlexGroup
              className={classes.user_box}
              alignItems="center"
              onClick={() => {
                // active chat section
                setIsActiveChat(true);
                //save clicked user id
                setOppositeID(user.id);
              }}
            >
              <EuiFlexItem grow={false}>
                <EuiAvatar size="m" name={user.userName} />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiText>
                  <p>{user.userName}</p>
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem grow={false} className={classes.user_box_icon}>
                <EuiIcon type={user.isOnline ? "online" : "offline"} />
              </EuiFlexItem>
            </EuiFlexGroup>
          );
        })}
      </div>
    </>
  );
};

export default Users;
