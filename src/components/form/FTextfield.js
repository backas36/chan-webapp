import { TextField } from "@mui/material"
import { useField } from "formik"

const FTextfield = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name)

  if (!field.value) {
    field.value = ""
  }
  const isError = (field.value && meta?.error) || (meta?.touched && meta?.error)

  const configTextfield = {
    fullWidth: true,
    variant: "standard",
    color: "primary",
    ...field,
    ...otherProps,
    ...(isError && {
      error: true,
      helperText: meta.error,
    }),
  }

  return <TextField {...configTextfield} />
}

export default FTextfield
