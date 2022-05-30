import { useState, useEffect } from "react";

const AllMassages = ({ socket }) => {
  const [massages, setMassages] = useState([]);
  useEffect(() => {
    socket.on("allMassages", (massage) => {
      if (massage) setMassages((massages) => [...massages, ...massage]);
    });
  }, []);

  return (
    <>
      <p>This is all</p>
      {massages?.map((massage, index) => (
        <p key={index}>{massage.text}</p>
      ))}
    </>
  );
};

export default AllMassages;
