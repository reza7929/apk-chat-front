import classes from "./scss/container-box.module.scss";

const ContainerBox = ({ children, showContent }) => {
  return (
    <div className={`${classes.container} ${showContent && classes.animation}`}>
      {children}
    </div>
  );
};

export default ContainerBox;
