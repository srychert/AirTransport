import { Box, Grid } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import { React, useState } from 'react'
import MySelect from "./FormComponents/MySelect";
import MyInput from "./FormComponents/MyInput";
import SubmitButton from "./FormComponents/SubmitButton";
import ErrorDialog from "./FormComponents/ErrorDialog";
import MyDate from "./FormComponents/MyDate";

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

  const size = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 2,
  };

  return (
    <Box>
      <Formik
        initialValues={{
          from: "",
          to: "",
          airplane: airplanes[0].id,
          documents: null,
          shipping_date: "",
        }}
        validate={(values) => {
          const errors = {};
          const messages = {
            from: "Location from required",
            to: "Location to required",
            airplane: "Airplane required",
            shipping_date: "Shipping date required",
            shipping_date_from_past: "Shipping date can't be from past",
          };

          const validationRequierd = (key, value) => {
            if (!value) {
              errors[key] = messages[key];
            }
          };

          const validateShippingDate = (date) => {
            if (new Date(date).setHours(23, 59, 59, 59) < new Date()) {
              errors.shipping_date = messages.shipping_date_from_past;
            }
          };

          for (const [key, value] of Object.entries(values)) {
            if (key === "documents") { continue }
            validationRequierd(key, value);
          }

          validateShippingDate(values.shipping_date)

          return errors;
        }}
        onSubmit={(values, { setStatus, setSubmitting }) => handleSubmit(values, setStatus, setSubmitting)}
        enableReinitialize={true}>
        {({ isSubmitting, status }) => (
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
              <>
                {/* files upload here */}
              </>
              <Grid item xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl}>
                <Field name="shipping_date" type="date" component={MyDate} />
              </Grid>
              <Grid item xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl}>
                <SubmitButton isSubmitting={isSubmitting} status={status} />
              </Grid>
            </Grid>
          </Form>
        )}

      </Formik>
      <ErrorDialog open={open} handleClose={handleClose} msg={msg} />
    </Box>
  )
}

export default TransportForm