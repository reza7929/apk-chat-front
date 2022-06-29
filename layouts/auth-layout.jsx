import classes from "./scss/auth-layout.module.scss";

const AuthLayout = ({ children }) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default AuthLayout;
