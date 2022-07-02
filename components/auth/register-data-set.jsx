import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { api_backend } from "../../utils/constance";
import { toast, ToastContainer } from "react-nextjs-toast";
import {
  EuiFieldText,
  EuiFieldPassword,
  EuiButton,
  EuiLink,
  EuiLoadingSpinner,
} from "@elastic/eui";
import ContainerBox from "../../layouts/auth/container-box";

const RegisterDataSet = ({ setIsRegister }) => {
  const [data, setData] = useState({
    userName: "",
    pass: "",
    confirmPass: "",
  }); // this will be get the data
  const [showContent, setShowContent] = useState(false); // this is for animation of showing register content
  const [isLoading, setIsLoading] = useState(false); // this is for loader
  //this function will be run when user clicked on register button
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
  //this function will be run when user clicked on register
  const handleLoginClick = () => {
    setShowContent(false);
    setTimeout(() => {
      setIsRegister(false);
    }, 1000);
  };

  return (
    <ContainerBox showContent={showContent}>
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
        حساب کاربری دارید ؟
      </EuiLink>
    </ContainerBox>
  );
};

export default RegisterDataSet;
