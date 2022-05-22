import { Box, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { Formik, Form, Field, FieldArray } from 'formik'
import { React, useState } from 'react'
import MySelect from "./FormComponents/MySelect";
import MyInput from "./FormComponents/MyInput";
import SubmitButton from "./FormComponents/SubmitButton";
import ErrorDialog from "./FormComponents/ErrorDialog";
import MyDate from "./FormComponents/MyDate";
import Cargo from './FormComponents/Cargo';
import FilesUpload from './FormComponents/FilesUpload';

function TransportForm() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = (values, setStatus, setSubmitting) => {
    handleClose();
    setStatus({
      sent: true,
      msg: "Success",
    });
    setSubmitting(false);

    console.log(values);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const airplanes = [
    { id: "Airbus A380", name: "Airbus A380", maxWeigth: 35 },
    { id: "Boeing 747", name: "Boeing 747", maxWeigth: 38 }
  ]

  const typesOfCargo = [
    { id: "normal", name: "normal" },
    { id: "dangerous", name: "dangerous" }]

  const size = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 3,
  };

  const cargoTemplate = () => {
    const cargo = {
      "name": "",
      "weight": 0,
      type: typesOfCargo[0].name,
    }
    return cargo
  }

  return (
    <Box >
      <Formik
        initialValues={{
          from: "",
          to: "",
          airplane: airplanes[0].id,
          documents: "",
          shipping_date: "",
          cargos: [cargoTemplate()],
        }}
        validate={(values) => {
          // getting filelist because value is a fake path string
          const inputElement = document.getElementById("documents");
          inputElement && inputElement.addEventListener("change", handleFiles, false);

          function handleFiles() {
            const fileListForm = this.files;
            console.log(fileListForm)
            values.fileList = fileListForm
          }

          console.log(values)
          const errors = {};
          const messages = {
            from: "Location from required",
            to: "Location to required",
            airplane: "Airplane required",
            shipping_date: "Shipping date required",
            shipping_date_from_past: "Shipping date can't be from past",
            shipping_date_wrong_day: "Shipping date can't be on weekend",
          };

          const validationRequierd = (key, value) => {
            if (!value) {
              errors[key] = messages[key];
            }
          };

          const validateShippingDate = (date) => {
            let shipping_date = new Date(date)
            shipping_date.setHours(23, 59, 59, 59)
            const day = shipping_date.getDay()

            if (shipping_date < new Date()) {
              errors.shipping_date = messages.shipping_date_from_past;
            }
            if (day === 0 || day === 6) {
              errors.shipping_date = messages.shipping_date_wrong_day;
            }
          };

          const validateCargos = (cargos) => {
            for (const [i, cargo] of cargos.entries()) {
              for (const [key, value] of Object.entries(cargo)) {
                const fieldName = `cargos.${i}.${key}`
                const keyName = key.charAt(0).toUpperCase() + key.slice(1)
                if (!value) {
                  errors[fieldName] = `${keyName} required`
                }

                if (key === "weight") {
                  if (value <= 0) {
                    errors[fieldName] = `${keyName} can't be non-negative`
                  }
                }

              }
            }
          }

          for (const [key, value] of Object.entries(values)) {
            if (key === "documents") { continue }
            validationRequierd(key, value);
          }

          validateShippingDate(values.shipping_date)
          validateCargos(values.cargos)

          return errors;
        }}
        onSubmit={(values, { setStatus, setSubmitting }) => handleSubmit(values, setStatus, setSubmitting)}
        enableReinitialize={true}>
        {({ isSubmitting, status, values }) => (
          <Card raised sx={{ height: "100%" }}>
            <CardHeader sx={{ bgcolor: "primary.main" }} />
            <CardContent>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl}>
                    <Field name="from" component={MyInput} />
                  </Grid>
                  <Grid item xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl}>
                    <Field name="to" component={MyInput} />
                  </Grid>
                  <Grid item xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl}>
                    <Field name="airplane" as="select" component={MySelect} items={airplanes} labelText="Airplane" />
                  </Grid>
                  <Grid item xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl}>
                    <Field name="shipping_date" type="date" component={MyDate} />
                  </Grid>
                  <Grid item xs={12} >
                    <Field name="documents" component={FilesUpload} />
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray
                      name="cargos"
                      render={array => (
                        <Box>
                          {values.cargos.map((cargo, index) => (
                            <Cargo array={array} cargo={cargo} index={index} typesOfCargo={typesOfCargo} cargoTemplate={cargoTemplate} key={index} size={size} />
                          ))}
                        </Box>
                      )}
                    />
                  </Grid>
                  <Grid item xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl}>
                    <SubmitButton isSubmitting={isSubmitting} status={status} />
                  </Grid>
                </Grid>
              </Form>
            </CardContent>
          </Card>
        )}
      </Formik>
      <ErrorDialog open={open} handleClose={handleClose} msg={msg} />
    </Box>
  )
}

export default TransportForm