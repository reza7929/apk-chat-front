import { Input, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { api_backend } from "../../utils/constance";

const DataSet = () => {
  const [data, setData] = useState();
  const handleSubmitBtn = async () => {
    if (data.pass != data.confirmPass) return alert("پسور ها برابر نیستند");
    try {
      await axios.post(api_backend + "/register", {
        userName: data.userName,
        password: data.pass.toString(),
      });
      alert("ثبت نام انجام شد");
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
      <Input
        placeholder="تکرار رمز"
        onChange={(e) => {
          setData({ ...data, confirmPass: e.target.value });
        }}
      />
      <Button variant="contained" onClick={() => handleSubmitBtn()}>
        Contained
      </Button>
    </>
  );
};

export default DataSet;
