import React from "react"

import { GridEditSingleSelectCell, useGridApiContext } from "@mui/x-data-grid"

const EditSingleSelectCell = React.memo(({ params, linkField }) => {
  const apiRef = useGridApiContext()

  const handleValueChange = async () => {
    await apiRef.current.setEditCellValue({
      id: params.id,
      field: linkField,
      value: "",
    })
  }
  return (
    <GridEditSingleSelectCell onValueChange={handleValueChange} {...params} />
  )
})

const renderSingleSelectCell = (params, linkField) => {
  return <EditSingleSelectCell params={params} linkField={linkField} />
}
export default renderSingleSelectCell
