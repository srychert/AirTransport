import { FormControl, TextField } from '@mui/material';
import React from 'react'

function FilesUpload({ field, form, labelText, ...props }) {
  const fieldName = field.name;
  let labelName = labelText ? labelText : fieldName.replace("_", " ")
  labelName = labelName.charAt(0).toUpperCase() + labelName.slice(1)

  const error = form.errors[fieldName] && form.touched[fieldName] ? true : false
  return (
    <FormControl fullWidth>
      {
        error
          ? <TextField id="documents" label={labelName} variant='outlined' type="file" multiple="multiple" error helperText={form.errors[fieldName]} InputLabelProps={{ shrink: true }} inputProps={{ multiple: true }} {...field} {...props} />
          : <TextField id="documents" label={labelName} variant='outlined' type="file" multiple="multiple" InputLabelProps={{ shrink: true }} inputProps={{ multiple: true }} {...field} {...props} />
      }
    </FormControl>
  )
}

export default FilesUpload