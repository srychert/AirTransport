import { Box, Grid } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import { React } from 'react'
import MySelect from "./FormComponents/MySelect";
import MyInput from "./FormComponents/MyInput";
import MyDate from "./FormComponents/MyDate";

function TransportForm() {

  const handleSubmit = (values, setStatus, setSubmitting) => {
    setStatus({
      sent: true,
      msg: "Success",
    });
    setSubmitting(false);

    console.log(values);
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
          // validate values here
          const errors = {};
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
            </Grid>
          </Form>
        )}

      </Formik>
    </Box>
  )
}

export default TransportForm