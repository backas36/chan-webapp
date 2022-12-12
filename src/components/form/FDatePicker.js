import React from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { Stack } from "@mui/system"
import { TextField } from "@mui/material"
import { useField, useFormikContext } from "formik"
import { format } from "date-fns"

const FDatePicker = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext()

  const [field, meta] = useField(name)
  if (!field.value) {
    field.value = ""
  }

  const isError = (field.value && meta?.error) || (meta?.touched && meta?.error)

  const textfieldConfig = {
    error: false,
    helperText: "",
    ...(isError && {
      error: true,
      helperText: meta.error,
    }),
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DatePicker
            value={field.value}
            disableFuture={true}
            views={["year", "month", "day"]}
            disableMaskedInput={true}
            label={name}
            openTo="year"
            inputFormat="yyyy-MM-dd"
            onChange={(newValue) => {
              setFieldValue(name, format(newValue, "yyyy-MM-dd"))
            }}
            {...otherProps}
            renderInput={(params) => {
              return (
                <TextField
                  autoComplete="off"
                  onKeyDown={(e) => {
                    e.preventDefault()
                  }}
                  {...params}
                  {...textfieldConfig}
                />
              )
            }}
          />
        </Stack>
      </LocalizationProvider>
    </>
  )
}

export default FDatePicker
