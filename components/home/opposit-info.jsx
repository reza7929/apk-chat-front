import { useContext, useEffect, useState } from "react";
import {
  UserContext,
  OppositUserContext,
  SetisActiveChatContext,
} from "../../context";
import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiIcon,
} from "@elastic/eui";

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
    <EuiHeader
      theme="dark"
      sections={[
        {
          items: [
            <EuiHeaderLogo>{oppositUser?.userName}</EuiHeaderLogo>,
            <EuiHeaderSectionItemButton>
              <EuiIcon
                type={oppositUser?.isOnline ? "online" : "offline"}
                size="m"
              />
            </EuiHeaderSectionItemButton>,
          ],
        },
        {
          items: [
            <EuiHeaderSectionItemButton onClick={() => setIsActiveChat(false)}>
              <EuiIcon type="cross" size="m" />
            </EuiHeaderSectionItemButton>,
          ],
        },
      ]}
    />
  );
};

export default OppositInfo;
