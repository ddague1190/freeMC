import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function Toggle({input: {onChange, value}, label, ...rest}) {

  return (
    <FormGroup>
      <FormControlLabel control={<Switch onChange={onChange} checked={value} {...rest} />} label={label} />
    </FormGroup>
  );
}
