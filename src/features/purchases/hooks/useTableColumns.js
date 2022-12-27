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
import { numberToTwo } from "../../../utils/mathHelper"
import { useGetAllInCategoriesQuery } from "../../ingredientCategory/services/inCaApiSlice"
import renderSingleSelectCell from "../../../components/Table/renderSingleSelectCell"

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

  const { data: inCategoriesData } = useGetAllInCategoriesQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  const suppliers = suppliersData?.data
  const ingredients = ingredientsData?.data
  const inCategories = inCategoriesData?.data

  const tableColumns = useMemo(() => {
    const singleSelectValueFormat = (params, optionsSource) => {
      const { value } = params
      if (!value) {
        return ""
      }
      const option = optionsSource.find((item) => item.id === value)

      return option?.name
    }

    const singleSelectValueParser = (value, optionsSource) => {
      if (!value) {
        return ""
      }
      const option = optionsSource.find((item) => item.id === value)
      return option.id
    }

    const singleSelectValueGetter = (params) => {
      const { row, api, field } = params
      const { editRows } = api.state
      if (editRows[row.id]?.[field]) {
        return editRows[row.id]?.[field]?.value || ""
      }
      return row?.[field]
    }

    const getValueOptions = (data, selectedParent = null) => {
      let optionsSource = data

      if (selectedParent) {
        optionsSource = optionsSource.filter(
          (item) => item.inCategoryId === selectedParent
        )
      }
      const options = optionsSource.map((item) => {
        const { id, name } = item
        return {
          label: name,
          value: id,
        }
      })

      return options
    }
    let columns =
      suppliers && ingredients && inCategories
        ? [
            {
              field: "supplierId",
              headerName: t("supplierTitle"),
              width: 200,
              editable: true,
              type: "singleSelect",
              valueOptions: (params) => getValueOptions(suppliers),
              valueGetter: singleSelectValueGetter,
              valueFormatter: (params) =>
                singleSelectValueFormat(params, suppliers),
              valueParser: (value) => singleSelectValueParser(value, suppliers),
              headerClassName: "must-input--header",
              preProcessEditCellProps: (params) =>
                preProcessCell(params, "supplierId"),
            },
            {
              field: "inCategoryId",
              headerName: t("categoryName"),
              width: 130,
              editable: true,
              type: "singleSelect",
              valueOptions: (params) => getValueOptions(inCategories),
              valueGetter: singleSelectValueGetter,
              valueFormatter: (params) =>
                singleSelectValueFormat(params, inCategories),
              valueParser: (value) =>
                singleSelectValueParser(value, inCategories),
              renderEditCell: (params) =>
                renderSingleSelectCell(params, "ingredientId"),
              headerClassName: "must-input--header",
            },
            {
              field: "ingredientId",
              headerName: t("ingredientName"),
              width: 160,
              editable: true,
              type: "singleSelect",
              valueOptions: (params) => {
                const { row } = params
                let selectedParent = row?.inCategoryId
                if (!selectedParent && !!row) {
                  return []
                }
                return getValueOptions(ingredients, selectedParent)
              },
              valueParser: (value) =>
                singleSelectValueParser(value, ingredients),
              valueGetter: singleSelectValueGetter,
              valueFormatter: (params) =>
                singleSelectValueFormat(params, ingredients),
              preProcessEditCellProps: (params) =>
                preProcessCell(params, "ingredientId"),
              headerClassName: "must-input--header",
            },
            {
              field: "sku",
              headerName: t("sku"),
              width: 100,
              editable: false,
              filterable: true,
              renderCell: renderCellExpand,
              filterOperators: getGridStringOperators().filter(
                (operator) => operator.value === "equals"
              ),
              valueGetter: (params) => {
                const { row, api, field } = params
                const { editRows } = api.state
                let sku = params.value
                let ingredientId = row.ingredientId
                if (editRows[row.id]?.ingredientId) {
                  ingredientId = editRows[row.id].ingredientId?.value
                  sku = ingredients.find((item) => item.id === ingredientId)?.[
                    field
                  ]
                }
                return sku
              },
              headerClassName: "must-input--header",
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
              width: 120,
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

                return numberToTwo(purchasePrice / quantity)
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
  }, [t, isAllowedEdit, currentUser, ingredients, suppliers, inCategories])
  return tableColumns
}
export default useTableColumns
