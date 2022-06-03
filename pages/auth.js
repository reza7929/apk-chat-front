import { useState } from "react";
import LoginDataSet from "../components/auth/login-data-set";
import RegisterDataSet from "../components/auth/register-data-set";
import AuthLayout from "../layouts/login-layout";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <AuthLayout>
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
