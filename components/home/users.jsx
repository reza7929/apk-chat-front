import {
  EuiTitle,
  EuiTextColor,
  EuiTextAlign,
  EuiListGroup,
  EuiListGroupItem,
} from "@elastic/eui";

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
      <EuiListGroup>
        {users?.map((user) => {
          return (
            <EuiListGroupItem
              key={user.userName}
              label={user.userName}
              iconType="user"
              onClick={() => {
                // active chat section
                setIsActiveChat(true);
                //save clicked user id
                setOppositeID(user.id);
              }}
              extraAction={{
                color: "text",
                iconType: user.isOnline ? "online" : "offline",
                iconSize: "m",
                "aria-label": "Check online box",
                alwaysShow: true,
                isDisabled: true,
              }}
            />
          );
        })}
      </EuiListGroup>
    </>
  );
};

export default Users;
