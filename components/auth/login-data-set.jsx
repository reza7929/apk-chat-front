import { Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { api_backend } from "../../utils/constance";
import classes from "./scss/login-data-set.module.scss";
import { toast, ToastContainer } from "react-nextjs-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Router from "next/router";
import {
  EuiFieldText,
  EuiFieldPassword,
  EuiButton,
  EuiLink,
} from "@elastic/eui";

const LoginDataSet = ({ setIsRegister }) => {
  const [data, setData] = useState({
    userName: "",
    pass: "",
  }); // this is for login input data
  const [showContent, setShowContent] = useState(false); // this is for animation of the content
  const [isLoading, setIsLoading] = useState(false); //this is for loader
  //this function will be run when user clicked on login button
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
  //this function will be run when user clicked on have an account text
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
        <EuiFieldText
          placeholder="نام کاربری"
          onChange={(e) => {
            setData({ ...data, userName: e.target.value });
          }}
        />
        <EuiFieldPassword
          placeholder="رمزعبور"
          type="dual"
          onChange={(e) => {
            setData({ ...data, pass: e.target.value });
          }}
        />
        {isLoading ? (
          <CircularProgress className={classes.loader} />
        ) : (
          <EuiButton
            color="primary"
            onClick={() => handleSubmitBtn()}
            fill
            fullWidth
          >
            ورود
          </EuiButton>
        )}
      </form>
      <EuiLink color="Subdued" onClick={() => handleRegisterClick()}>
        ثبت نام
      </EuiLink>
    </div>
  );
};

export default LoginDataSet;
