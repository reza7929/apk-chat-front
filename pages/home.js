import axios from "axios";
import { useState, useEffect } from "react";
import { api_backend } from "../utils/constance";
import jwt_decode from "jwt-decode";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.post(api_backend + "/login/users-info");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setUserInfo(decoded);
  }, []);

  return (
    <>
      <div>Home</div>
      {data.map((item) => {
        if (item.id != userInfo.id)
          return (
            <Link
              key={item.userName}
              href={`/chat?id=${item.id}&userName=${item.userName}`}
            >
              <a>
                <p>{item.userName}</p>
                {console.log(item.isOnline)}
              </a>
            </Link>
          );
      })}
    </>
  );
}
