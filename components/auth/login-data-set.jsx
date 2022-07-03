import axios from "axios";
import { useState } from "react";
import { api_backend } from "../../utils/constance";
import Router from "next/router";
import {
  EuiFieldText,
  EuiFieldPassword,
  EuiButton,
  EuiLink,
  EuiLoadingSpinner,
  EuiGlobalToastList,
} from "@elastic/eui";

const LoginDataSet = ({ setIsRegister, setShowContent }) => {
  const [data, setData] = useState({
    userName: "",
    pass: "",
  }); // this is for login input data
  const [isLoading, setIsLoading] = useState(false); //this is for loader
  const [toasts, setToasts] = useState([]);
  //this function will be run when user clicked on login button
  const handleSubmitBtn = async () => {
    if (!data.userName || !data.pass)
      return setToasts([
        {
          color: "danger",
          text: <p>فیلد نمیتواندخالی باشد</p>,
        },
      ]);
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
      return setToasts([
        {
          color: "danger",
          text: <p>{err.response.data ? err.response.data : "خطای سرور"}</p>,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  //this function will be run when user clicked on have an account text
  const handleRegisterClick = () => {
    setShowContent(false);
    setTimeout(() => {
      setIsRegister(true);
      setShowContent(true);
    }, 1000);
  };

  return (
    <>
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
          <EuiLoadingSpinner size="xxl" />
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
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={() => setToasts([])}
        toastLifeTimeMs={6000}
      />
    </>
  );
};

export default LoginDataSet;
