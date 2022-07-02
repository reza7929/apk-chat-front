import {
  EuiTitle,
  EuiTextColor,
  EuiTextAlign,
  EuiFlexGroup,
  EuiFlexItem,
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
              isActive={user.isOnline}
              iconType="user"
              onClick={() => {
                // active chat section
                setIsActiveChat(true);
                //save clicked user id
                setOppositeID(user.id);
              }}
            />
          );
        })}
      </EuiListGroup>
    </>
  );
};

export default Users;
