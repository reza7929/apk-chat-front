import { Input, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { api_backend } from "../../utils/constance";

const LoginDataSet = () => {
  const [data, setData] = useState();
  const handleSubmitBtn = async () => {
    try {
      const res = await axios.post(api_backend + "/login", {
        userName: data.userName,
        password: data.pass.toString(),
      });
      alert("ورود موفق");
      window.localStorage.setItem("token", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Input
        placeholder="نام کاربری"
        onChange={(e) => {
          setData({ ...data, userName: e.target.value });
        }}
      />
      <Input
        placeholder="رمز ورود"
        onChange={(e) => {
          setData({ ...data, pass: e.target.value });
        }}
      />
      <Button variant="contained" onClick={() => handleSubmitBtn()}>
        Contained
      </Button>
    </>
  );
};

export default LoginDataSet;
