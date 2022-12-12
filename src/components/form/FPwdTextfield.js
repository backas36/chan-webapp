import { TextField, InputAdornment, IconButton } from "@mui/material"
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { useField } from "formik"

const FPwdTextfield = ({
  name,
  isShowValue,
  setIsShowValue,
  ...otherProps
}) => {
  //const [field, meta, helpers] = useField(name)
  const [field, meta] = useField(name)

  if (!field.value) {
    field.value = ""
  }

  const isError = (field.value && meta?.error) || (meta?.touched && meta?.error)

  const configPwdTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "standard",
    ...(isError && {
      error: true,
      helperText: meta.error,
    }),
  }

  return (
    <TextField
      {...configPwdTextfield}
      type={isShowValue ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton color="primary" onClick={setIsShowValue}>
              {isShowValue ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default FPwdTextfield
