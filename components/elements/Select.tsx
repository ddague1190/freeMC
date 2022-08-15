import React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function SelectMulti({ 
  input: {name, value, onChange, ...restInput},
  meta,
  label,
  formControlProps,
  ...rest
}) {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <FormControl {...formControlProps} error={showError}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select 
        
        sx={{width: '300px', margin: '30px'}}
        {...rest}
        name={name}
        error={meta.error && meta.touched}
        value={value}
        onChange={onChange}
        inputProps={restInput}
        variant='standard'
      />
    </FormControl>
  );
}

SelectMulti.propTypes = {};

export default SelectMulti;
