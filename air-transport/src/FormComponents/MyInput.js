import { FormControl, TextField } from "@mui/material";
import React from "react";

function MyInput({ field, form, InputProps, labelText, ...props }) {
  const fieldName = field.name;
  let labelName = labelText ? labelText : fieldName.replace("_", " ")
  labelName = labelName.charAt(0).toUpperCase() + labelName.slice(1)
  const withError = <TextField label={labelName} error helperText={form.errors[fieldName]} InputProps={InputProps} {...field} {...props} />;
  const normal = <TextField label={labelName} InputProps={InputProps} {...field} {...props} />;
  return <FormControl fullWidth>{form.errors[fieldName] && (form.touched[fieldName] || form.touched.cargos) ? withError : normal}</FormControl>;
}

export default MyInput;