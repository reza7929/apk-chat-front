import { useEffect, useState } from "react";
import LoginDataSet from "../components/auth/login-data-set";
import RegisterDataSet from "../components/auth/register-data-set";
import Head from "next/head";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiHorizontalRule,
  EuiText,
} from "@elastic/eui";
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
          <EuiPanel
            className={`${classes.content} ${
              showContent && classes.content_animation
            } apk-align-center`}
            paddingSize="m"
          >
            <EuiText>
              <h1>{isRegister ? "ثبت نام" : "ورود"}</h1>
            </EuiText>
            <EuiHorizontalRule margin="m" />

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
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}
