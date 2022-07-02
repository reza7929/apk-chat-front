import AllMassages from "./all-massages";
import SendMassage from "./send-massage";
import OppositInfo from "./opposit-info";
import { EuiFlexGroup, EuiFlexItem, EuiText, EuiIcon } from "@elastic/eui";

const ChatSection = ({ isActiveChat }) => {
  if (isActiveChat)
    return (
      <>
        <OppositInfo />
        <AllMassages />
        <SendMassage />
      </>
    );

  return (
    <EuiFlexGroup justifyContent="center" alignItems="center">
      <EuiFlexItem>
        <EuiIcon type="logoElastic" size="xl" style={{ margin: "auto" }} />
        <EuiText textAlign="center">
          <p>لطفا یکی از کاربران مقابل را برای ارسال ‍بیام انتخاب کنید</p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default ChatSection;
