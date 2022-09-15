import * as React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function ControlledHeightTextarea(props) {
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
    inputOnChange && inputOnChange(e);
  };
  return (
    <TextareaAutosize
      aria-label="please enter motorcycle description"
      minRows={3}
      maxRows={20}
      placeholder="Description of motorcycle (conditions, accessories, etc.)"
      style={{width: 200}}
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
