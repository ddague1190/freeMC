import * as React from "react";
import {FieldRenderProps} from "react-final-form";
import TextField, {OnePirateTextFieldProps} from "../elements/TextField";

const RFTextField = React.forwardRef(
  (
    props: OnePirateTextFieldProps & FieldRenderProps<string, HTMLElement>,
    ref
  ) => {
    const {
      autoComplete,
      input,
      inputOnChange,
      InputProps,
      meta: {touched, error, submitError},
      ...other
    } = props;

    const {onChange} = input;

    input.onChange = (e) => {
      onChange(e);
      inputOnChange && inputOnChange();
    };

    return (
      <TextField
        inputRef={ref}
        error={Boolean(!!touched && (error || submitError))}
        {...input}
        {...other}
        InputProps={{
          inputProps: {
            autoComplete,
          },
          ...InputProps,
        }}
        helperText={touched ? error || submitError : ""}
        variant="standard"
      />
    );
  }
);

export default RFTextField;
