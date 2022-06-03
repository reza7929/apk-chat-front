import classes from "./scss/auth-layout.module.scss";

const AuthLayout = ({ children }) => (
  <div className={classes.wrapper}>{children}</div>
);

export default AuthLayout;
