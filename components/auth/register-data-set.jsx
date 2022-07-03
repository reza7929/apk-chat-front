import { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { api_backend } from "../../utils/constance";
import {
  EuiFieldText,
  EuiFieldPassword,
  EuiButton,
  EuiLink,
  EuiLoadingSpinner,
  EuiGlobalToastList,
  EuiText,
} from "@elastic/eui";

const RegisterDataSet = ({ setIsRegister, setShowContent }) => {
  const [data, setData] = useState({
    userName: "",
    pass: "",
    confirmPass: "",
  }); // this will be get the data
  const [isLoading, setIsLoading] = useState(false); // this is for loader
  const [toasts, setToasts] = useState([]);
  //this function will be run when user clicked on register button
  const handleSubmitBtn = async () => {
    if (!data.userName || !data.pass || !data.confirmPass)
      return setToasts([
        {
          color: "danger",
          text: <p>فیلد نمیتواندخالی باشد</p>,
        },
      ]);
    if (data.pass != data.confirmPass)
      return setToasts([
        {
          color: "danger",
          text: <p>پسور ها برابر نیستند</p>,
        },
      ]);
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
  //this function will be run when user clicked on register
  const handleLoginClick = () => {
    setShowContent(false);
    setTimeout(() => {
      setIsRegister(false);
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
        <EuiFieldPassword
          placeholder="تکرار رمزعبور"
          type="dual"
          onChange={(e) => {
            setData({ ...data, confirmPass: e.target.value });
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
            ثبت نام
          </EuiButton>
        )}
      </form>
      <EuiLink color="Subdued" onClick={() => handleLoginClick()}>
        <EuiText>
          <p>حساب کاربری دارید ؟</p>
        </EuiText>
      </EuiLink>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={() => setToasts([])}
        toastLifeTimeMs={6000}
      />
    </>
  );
};

export default RegisterDataSet;
