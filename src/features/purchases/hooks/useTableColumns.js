import {
  getGridNumericOperators,
  getGridStringOperators,
} from "@mui/x-data-grid"
import { useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import renderCellExpand from "../../../components/Table/renderCellExpand"
import { selectCurrentUser } from "../../me"
import { getAllowRoles } from "../../../utils/constants"
import {
  formatDate,
  formatDateTime,
  getToday,
} from "../../../utils/dateTimeManger"
import { validateField } from "../utils"

import renderDateCell from "../../../components/Table/renderDateCell"
import renderActions from "../components/renderActions"
import { useGetAllSuppliersQuery } from "../../suppliers"
import { useGetAllIngredientsQuery } from "../../ingredients"

const preProcessCell = async (params, field) => {
  const { props } = params
  try {
    await validateField(field, props.value)
  } catch (err) {
    return { ...props, error: true }
  }
  return { ...props, error: false }
}

const useTableColumns = () => {
  const { t } = useTranslation()
  const currentUser = useSelector(selectCurrentUser)
  const isAllowedEdit = useCallback(
    () => getAllowRoles(true, true).includes(currentUser?.role),
    [currentUser?.role]
  )

  const { data: ingredientsData } = useGetAllIngredientsQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  const { data: suppliersData } = useGetAllSuppliersQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  const suppliers = suppliersData?.data
  const ingredients = ingredientsData?.data

  const tableColumns = useMemo(() => {
    const singleSelectValueFormat = (params) => {
      const { value, field, api } = params
      const colDef = api.getColumn(field)

      const option = colDef?.valueOptions?.find(
        ({ value: optionValue }) => value === optionValue
      )
      return option?.label || value.label
    }

    const singleSelectValueParser = (value, params) => {
      const { colDef } = params
      const option = colDef?.valueOptions?.find(
        ({ value: optionValue }) => value === optionValue
      )
      return option.value
    }

    const singleSelectValueGetter = (params) => {
      const { row, api, field } = params
      const { editRows } = api.state
      if (editRows[row.id]?.[field]) {
        return editRows[row.id]?.[field]?.value
      }
      return row?.[field]
    }

    let columns =
      suppliers && ingredients
        ? [
            {
              field: "supplierId",
              headerName: t("supplierTitle"),
              width: 200,
              editable: true,
              type: "singleSelect",
              valueOptions: suppliers.map((supplier) => ({
                label: `${supplier.name} - [${supplier.type}]`,
                value: supplier.id,
              })),
              valueGetter: singleSelectValueGetter,
              valueFormatter: singleSelectValueFormat,
              valueParser: singleSelectValueParser,
              headerClassName: "must-input--header",
              preProcessEditCellProps: (params) =>
                preProcessCell(params, "supplierId"),
            },
            {
              field: "ingredientId",
              headerName: t("ingredientTitle"),
              width: 250,
              editable: true,
              type: "singleSelect",
              valueOptions: ingredients.map((ingredient) => {
                const { id, name, category, sku } = ingredient
                return {
                  label: `${category} - ${name} - ${sku}`,
                  value: id,
                }
              }),
              valueGetter: singleSelectValueGetter,
              valueFormatter: singleSelectValueFormat,
              valueParser: singleSelectValueParser,
              headerClassName: "must-input--header",
              preProcessEditCellProps: (params) =>
                preProcessCell(params, "ingredientId"),
            },
            {
              field: "brand",
              headerName: t("ingredientBrand"),
              width: 100,
              editable: true,
              filterable: true,
              renderCell: renderCellExpand,
              filterOperators: getGridStringOperators().filter(
                (operator) => operator.value === "equals"
              ),
              preProcessEditCellProps: (params) => {
                return preProcessCell(params, "brand")
              },
              headerClassName: "must-input--header",
            },
            {
              field: "quantity",
              headerName: t("purchaseQuantity"),
              width: 100,
              type: "number",
              headerAlign: "left",
              editable: true,
              filterable: true,
              renderCell: renderCellExpand,
              filterOperators: getGridNumericOperators().filter(
                (operator) => operator.value === "="
              ),
              preProcessEditCellProps: (params) => {
                return preProcessCell(params, "quantity")
              },
              headerClassName: "must-input--header",
            },

            {
              field: "purchasePrice",
              headerName: t("purchasePrice"),
              width: 120,
              type: "number",
              headerAlign: "left",
              editable: true,
              filterable: true,
              renderCell: renderCellExpand,
              filterOperators: getGridNumericOperators().filter(
                (operator) => operator.value === "="
              ),
              preProcessEditCellProps: (params) =>
                preProcessCell(params, "purchasePrice"),
              headerClassName: "must-input--header",
            },
            {
              field: "unitPrice",
              headerName: t("unitPrice"),
              width: 100,
              type: "number",
              headerAlign: "left",
              editable: false,
              filterable: false,
              renderCell: renderCellExpand,
              headerClassName: "must-input--header",
              valueGetter: (params) => {
                const { id } = params.row
                let purchasePrice = 0
                let quantity = 0
                if (params.api.state?.editRows?.[id]) {
                  purchasePrice =
                    params.api.state?.editRows?.[id].purchasePrice?.value || 0
                  quantity =
                    params.api.state?.editRows?.[id].quantity?.value || 1
                } else {
                  purchasePrice = params.row.purchasePrice
                  quantity = params.row.quantity
                }
                return (purchasePrice / quantity).toFixed(2)
              },
            },

            {
              field: "purchaseDate",
              headerName: t("purchaseDate"),
              width: 170,
              editable: true,
              resizable: false,
              type: "date",
              renderEditCell: renderDateCell,
              valueGetter: ({ row }) => {
                if (!row.purchaseDate) {
                  return getToday()
                }
                return row.purchaseDate
              },
              valueFormatter: (params) => {
                const purchaseDate = params.value
                return purchaseDate ? formatDate(purchaseDate) : "-"
              },
              filterable: true,
              preProcessEditCellProps: (params) =>
                preProcessCell(params, "purchaseDate"),
              headerClassName: "must-input--header",
            },

            {
              field: "ingredientExpDate",
              headerName: t("ingredientExpDate"),
              width: 170,
              editable: true,
              resizable: false,
              type: "date",
              renderEditCell: (params) => renderDateCell(params, false),
              valueFormatter: (params) => {
                const ingredientExpDate = params.value
                return ingredientExpDate ? formatDate(ingredientExpDate) : "-"
              },
              filterable: true,
              preProcessEditCellProps: (params) =>
                preProcessCell(params, "ingredientExpDate"),
              headerClassName: "must-input--header",
            },
            {
              field: "createdByName",
              headerName: t("createdByName"),
              width: 120,
              editable: false, //TODO
              filterable: true,
              renderCell: renderCellExpand,
              filterOperators: getGridStringOperators().filter(
                (operator) => operator.value === "equals"
              ),
              cellClassName: "default-value--cell",
              valueGetter: (params) => {
                if (!params.value) {
                  return currentUser.name
                }
                return params.value
              },
            },
            {
              field: "createdAt",
              headerName: t("createdAt"),
              width: 150,
              filterable: false,
              type: "dateTime",
              renderCell: (params) => {
                const createdAt = params.value
                return createdAt ? formatDateTime(params?.row.createdAt) : "-"
              },
              cellClassName: "default-value--cell",
            },
          ]
        : []
    return isAllowedEdit()
      ? [
          {
            field: "actions",
            headerName: t("actions"),
            width: 100,
            type: "actions",
            renderCell: (params) => renderActions(params),
          },
          ...columns,
        ]
      : columns
  }, [t, isAllowedEdit, currentUser, ingredients, suppliers])
  return tableColumns
}
export default useTableColumns
