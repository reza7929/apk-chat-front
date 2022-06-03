import classes from "./scss/loader.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => (
  <div className={classes.wrapper}>
    <CircularProgress />
  </div>
);

export default Loader;
