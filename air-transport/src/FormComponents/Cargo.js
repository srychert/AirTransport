import { Field } from 'formik'
import React from 'react'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, InputAdornment } from '@mui/material';
import MyInput from './MyInput';
import MySelect from './MySelect';

function Cargo({ array, cargo, typesOfCargo, cargoTemplate, index, size }) {
  return (
    <Grid container spacing={2} paddingBottom={1}>
      <Grid item xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl}>
        <Field name={`cargos.${index}.name`} component={MyInput} labelText="Name" />
      </Grid>
      <Grid item xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl}>
        <Field name={`cargos.${index}.weight`} type="number" component={MyInput} labelText="Weight"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }} />
      </Grid>
      <Grid item xs={size.xs} sm={size.sm} md={size.md} lg={3.85} xl={3.85}>
        <Stack direction="row" spacing={0}>
          <Field name={`cargos.${index}.type`} as="select" component={MySelect} items={typesOfCargo} labelText="Type" />
          <IconButton aria-label="add" color="success" onClick={() => array.insert(index, cargoTemplate())}
            sx={{
              padding: 1,
              "&:hover": {
                color: "success.dark",
              },
            }}
          >
            <AddCircleIcon />
          </IconButton>
          <IconButton disabled={array.form.values.cargos.length === 1} aria-label="delete" color="error" onClick={() => array.remove(index)}
            sx={{
              padding: 1,
              "&:hover": {
                color: "error.dark",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Cargo