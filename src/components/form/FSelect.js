import React from "react"
import { TextField, MenuItem } from "@mui/material"
import { useField, useFormikContext } from "formik"

const FSelect = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(name)

  if (!field.value) {
    field.value = ""
  }

  const handleChange = (e) => {
    const { value } = e.target
    setFieldValue(name, value)
  }

  const isError = (field.value && meta?.error) || (meta?.touched && meta?.error)

  const configSelect = {
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
    ...field,
    ...otherProps,
    ...(isError && {
      error: true,
      helperText: meta.error,
    }),
  }

  return (
    <TextField {...configSelect}>
      {Object.entries(options).map(([objKey, objVal]) => {
        return (
          <MenuItem key={objKey} value={objVal}>
            {objVal}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

export default FSelect
