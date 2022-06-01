import classes from "./scss/home-layout.module.scss";

const HomeLayout = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default HomeLayout;
