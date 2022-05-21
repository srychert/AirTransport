import { Field } from 'formik'
import React from 'react'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, InputAdornment } from '@mui/material';
import MyInput from './MyInput';
import MySelect from './MySelect';

function Cargo({ array, cargo, typesOfCargo, cargoTemplate, index }) {
  return (
    <Box key={index} sx={{ display: "flex", flexDirection: "row" }}>
      <Field name={`cargos.${index}.name`} component={MyInput} labelText="Name" />
      <Field name={`cargos.${index}.weight`} type="number" component={MyInput} labelText="Weight"
        InputProps={{
          endAdornment: <InputAdornment position="end">kg</InputAdornment>,
        }} />
      <Field name={`cargos.${index}.type`} as="select" component={MySelect} items={typesOfCargo} labelText="Type" />
      <Stack direction="row" spacing={0}>
        <IconButton aria-label="add" color="success" onClick={() => array.insert(index, cargoTemplate())}
          sx={{
            paddingRight: 0,
            "&:hover": {
              color: "success.dark",
            },
          }}
        >
          <AddCircleIcon />
        </IconButton>
        <IconButton aria-label="delete" color="error" onClick={() => array.remove(index)}
          sx={{
            paddingLeft: 0,
            "&:hover": {
              color: "error.dark",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default Cargo