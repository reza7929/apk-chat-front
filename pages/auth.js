import { useState } from "react";
import LoginDataSet from "../components/auth/login-data-set";
import RegisterDataSet from "../components/auth/register-data-set";
import AuthLayout from "../layouts/auth-layout";
import Head from "next/head";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <AuthLayout>
      <Head>
        <title>apk | احرازهویت</title>
        <meta name="description" content="پروژه تست احرازهویت" />
      </Head>
      {isRegister ? (
        <RegisterDataSet
          isRegister={isRegister}
          setIsRegister={setIsRegister}
        />
      ) : (
        <LoginDataSet setIsRegister={setIsRegister} />
      )}
    </AuthLayout>
  );
}
