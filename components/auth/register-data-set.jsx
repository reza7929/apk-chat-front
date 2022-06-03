import { useEffect, useState } from "react";
import TextInput from "../common/text-input";
import classes from "./scss/register-data-set.module.scss";
import { Button } from "@mui/material";
import axios from "axios";
import Router from "next/router";
import { api_backend } from "../../utils/constance";
import { toast, ToastContainer } from "react-nextjs-toast";
import CircularProgress from "@mui/material/CircularProgress";

const RegisterDataSet = ({ setIsRegister }) => {
  const [data, setData] = useState({
    userName: "",
    pass: "",
    confirmPass: "",
  });
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmitBtn = async () => {
    if (!data.userName || !data.pass || !data.confirmPass)
      return toast.notify("", {
        duration: 5,
        type: "info",
        title: "فیلد نمیتواند خالی باشد",
      });
    if (data.pass != data.confirmPass)
      return toast.notify("", {
        duration: 5,
        type: "info",
        title: "پسور ها برابر نیستند",
      });
    setIsLoading(true);
    try {
      const res = await axios.post(api_backend + "/register", {
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
  const handleLoginClick = () => {
    setShowContent(false);
    setTimeout(() => {
      setIsRegister(false);
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
          label="رمز عبور"
          onChange={(e) => {
            setData({ ...data, pass: e.target.value });
          }}
          type="password"
        />
        <TextInput
          label="تکرار رمز عبور"
          onChange={(e) => {
            setData({ ...data, confirmPass: e.target.value });
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
            Register
          </Button>
        )}
      </form>
      <p className={classes.login_text} onClick={() => handleLoginClick()}>
        حساب کاربری دارید ؟
      </p>
    </div>
  );
};

export default RegisterDataSet;
