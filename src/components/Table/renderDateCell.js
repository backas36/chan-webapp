import { InputBase } from "@mui/material"
import { useGridApiContext } from "@mui/x-data-grid"
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers"
import { formatDate } from "../../utils/dateTimeManger"
import React from "react"

const TableDateCell = React.memo(({ params, disabledFuture = true }) => {
  const { id, field, value, colDef } = params

  const apiRef = useGridApiContext()
  const Component = colDef.type === "dateTime" ? DateTimePicker : DatePicker
  const handleChange = (newValue) => {
    apiRef.current.setEditCellValue({
      id,
      field,
      value: formatDate(newValue),
    })
  }
  return (
    <Component
      value={value ? value : ""}
      disableFuture={disabledFuture}
      disablePast={!disabledFuture}
      views={["year", "month", "day"]}
      disableMaskedInput={true}
      openTo="year"
      inputFormat="yyyy-MM-dd"
      renderInput={({ inputRef, inputProps, InputProps, disabled, error }) => {
        return (
          <InputBase
            autoComplete="off"
            sx={{ paddingRight: "50px" }}
            onKeyDown={(e) => {
              e.preventDefault()
            }}
            fullWidth
            ref={inputRef}
            {...InputProps}
            disabled={disabled}
            error={!!value && error}
            inputProps={inputProps}
          />
        )
      }}
      onChange={handleChange}
    />
  )
})

const renderDateCell = (params, disabledFuture) => {
  return <TableDateCell params={params} disabledFuture={disabledFuture} />
}
export default renderDateCell
