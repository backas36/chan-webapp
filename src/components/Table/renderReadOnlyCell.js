import React, { useRef } from "react"

import { InputBase } from "@mui/material"
import { useGridApiContext } from "@mui/x-data-grid"

const GridCell = React.memo(({ params, valueHelper, targetKey }) => {
  const { row, field, colDef, id } = params
  const apiRef = useGridApiContext()
  const value = valueHelper(
    apiRef.current.state.editRows[id]?.[targetKey].value || row[targetKey]
  )

  return (
    <InputBase
      autoComplete="off"
      fullWidth
      type={colDef?.type}
      readOnly
      value={value?.[field] || "-"}
    />
  )
})

const renderReadOnlyCell = (params, valueHelper, targetKey) => {
  return (
    <GridCell params={params} valueHelper={valueHelper} targetKey={targetKey} />
  )
}

export default renderReadOnlyCell
