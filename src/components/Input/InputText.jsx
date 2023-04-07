import { TextField } from '@mui/material';
import React from 'react';

function InputText(props) {
  return (
    <TextField
      required={props.options.required}
      label={props.options.label}
      placeholder={props.options.placeholder}
      helperText={props.options.helperText}
      multiline={props.options.multiline}
      maxRows={4}
      value={props.stateValue}
      onChange={props.handleState}
      sx={{ width: '100%' }}
    />
  );
}

export default InputText;
