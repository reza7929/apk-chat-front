import { api_backend } from "../utils/constance";
import io from "socket.io-client";
import SendMassage from "../components/chat/SendMassage";
import AllMassages from "../components/chat/AllMassages";

export default function Chat() {
  const socket = io(api_backend);

  return (
    <div>
      <h1>Chat</h1>
      <AllMassages socket={socket} />
      <SendMassage socket={socket} />
    </div>
  );
}
