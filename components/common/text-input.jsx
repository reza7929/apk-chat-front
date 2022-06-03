import classes from "./scss/text-input.module.scss";
import { TextField } from "@mui/material";

const TextInput = ({ ...props }) => {
  return (
    <TextField
      variant="standard"
      id="margin-normal"
      className={classes.text_field}
      margin="normal"
      InputProps={{
        disableUnderline: true,
      }}
      fullWidth
      {...props}
    />
  );
};

export default TextInput;
