import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { DateTimePicker } from "@mui/x-date-pickers"
import { Stack, TextField } from "@mui/material"
import { useField, useFormikContext } from "formik"
import { useTranslation } from "react-i18next"
import { formatDate, formatDateTime } from "../../utils/dateTimeManger"

const FDatePicker = ({ name, timeType, ...otherProps }) => {
  const { t } = useTranslation()
  const { setFieldValue } = useFormikContext()
  const isDateTime = timeType !== "dateTime"
  const Picker = isDateTime ? DateTimePicker : DatePicker

  const [field, meta] = useField(name)
  if (!field.value) {
    field.value = ""
  }
  const pickerConfig = {
    disableFuture: true,
    disableMaskedInput: true,
    label: name,
    value: field.value,
    openTo: "year",
    inputFormat: isDateTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd",
    onChange: (newValue) => {
      setFieldValue(
        name,
        isDateTime ? formatDateTime(newValue) : formatDate(newValue)
      )
    },
    views: isDateTime
      ? ["year", "month", "day", "hours", "minutes"]
      : ["year", "month", "day"],
  }

  const isError = (field.value && meta?.error) || (meta?.touched && meta?.error)

  const textfieldConfig = {
    error: false,
    helperText: "",
    ...(isError && {
      error: true,
      helperText: t(meta.error),
    }),
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <Picker
            {...pickerConfig}
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
