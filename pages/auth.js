import { useEffect, useState } from "react";
import LoginDataSet from "../components/auth/login-data-set";
import RegisterDataSet from "../components/auth/register-data-set";
import Head from "next/head";
import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import classes from "../styles/scss/auth.module.scss";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <>
      <Head>
        <title>apk | احرازهویت</title>
        <meta name="description" content="پروژه تست احرازهویت" />
      </Head>
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        gutterSize="none"
        className={classes.container}
      >
        <EuiFlexItem grow={false}>
          <div
            className={`${classes.content} ${
              showContent && classes.content_animation
            }`}
          >
            {isRegister ? (
              <RegisterDataSet
                setIsRegister={setIsRegister}
                setShowContent={setShowContent}
              />
            ) : (
              <LoginDataSet
                setIsRegister={setIsRegister}
                setShowContent={setShowContent}
              />
            )}
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}
