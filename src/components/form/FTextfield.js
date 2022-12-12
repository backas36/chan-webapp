import { TextField } from "@mui/material"
import { useField } from "formik"
import { useTranslation } from "react-i18next"

const FTextfield = ({ name, ...otherProps }) => {
  const { t } = useTranslation()
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
      helperText: t(meta.error),
    }),
  }

  return <TextField {...configTextfield} />
}

export default FTextfield
