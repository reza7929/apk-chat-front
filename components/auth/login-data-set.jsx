import { Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { api_backend } from "../../utils/constance";
import TextInput from "../common/text-input";
import classes from "./scss/login-data-set.module.scss";
import { toast, ToastContainer } from "react-nextjs-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Router from "next/router";

const LoginDataSet = ({ setIsRegister }) => {
  const [data, setData] = useState({
    userName: "",
    pass: "",
  });
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmitBtn = async () => {
    if (!data.userName || !data.pass)
      return toast.notify("", {
        duration: 5,
        type: "info",
        title: "فیلد نمیتواند خالی باشد",
      });
    setIsLoading(true);
    try {
      const res = await axios.post(api_backend + "/login", {
        userName: data.userName,
        password: data.pass.toString(),
      });
      await window.localStorage.setItem("token", res.data);
      Router.push("/");
    } catch (err) {
      console.log(err);
      return toast.notify("", {
        duration: 5,
        type: "error",
        title: err.response.data ? err.response.data : "خطای سرور",
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setShowContent(true);
  }, []);
  const handleRegisterClick = () => {
    setShowContent(false);
    setTimeout(() => {
      setIsRegister(true);
    }, 1000);
  };

  return (
    <div className={`${classes.container} ${showContent && classes.animation}`}>
      <ToastContainer />
      <form>
        <TextInput
          label="نام کاربری"
          onChange={(e) => {
            setData({ ...data, userName: e.target.value });
          }}
        />
        <TextInput
          label="رمز ورود"
          onChange={(e) => {
            setData({ ...data, pass: e.target.value });
          }}
          type="password"
        />
        {isLoading ? (
          <CircularProgress className={classes.loader} />
        ) : (
          <Button
            onClick={() => handleSubmitBtn()}
            type="button"
            color="primary"
            className={classes.btn}
          >
            Log in
          </Button>
        )}
      </form>
      <p
        className={classes.register_text}
        onClick={() => handleRegisterClick()}
      >
        ثبت نام
      </p>
    </div>
  );
};

export default LoginDataSet;
