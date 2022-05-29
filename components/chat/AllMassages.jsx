import { useState, useEffect } from "react";

const AllMassages = ({ socket }) => {
  const [massages, setMassages] = useState([]);
  useEffect(() => {
    socket.emit("allMassages");
    socket.on("allMassagesRes", (res) => {
      setMassages(res);
    });
  }, []);

  return (
    <>
      <p>This is all</p>
      {massages.map((massage, index) => (
        <p key={index}>{massage.text}</p>
      ))}
    </>
  );
};

export default AllMassages;
