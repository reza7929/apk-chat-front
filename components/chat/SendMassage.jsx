import { Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";

const SendMassage = ({ socket }) => {
  const [massage, setMassage] = useState();
  const handleSubmitBtn = () => {
    if (massage) {
      socket.emit("sendMessage", { massage });
      return setMassage("");
    }
    alert("فیلد نمیتواند خالی باشد");
  };
  //   useEffect(() => {
  //     const listener = (event) => {
  //       if (event.code === "Enter" || event.code === "NumpadEnter") {
  //         event.preventDefault();
  //         handleSubmitBtn();
  //       }
  //     };
  //     document.addEventListener("keydown", listener);
  //     return () => {
  //       document.removeEventListener("keydown", listener);
  //     };
  //   }, []);

  return (
    <>
      <Input value={massage} onChange={(e) => setMassage(e.target.value)} />
      <SendIcon onClick={() => handleSubmitBtn()} />
    </>
  );
};

export default SendMassage;
