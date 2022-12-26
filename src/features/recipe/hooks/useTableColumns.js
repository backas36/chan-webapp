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
import { validateField } from "../utils"
import { useGetAllIngredientsQuery } from "../../ingredients"
import renderActions from "../components/renderActions"

import { useGetAllInCategoriesQuery } from "../../ingredientCategory/services/inCaApiSlice"
import renderSingleSelectCell from "../../../components/Table/renderSingleSelectCell"
import { formatDateTime } from "../../../utils/dateTimeManger"
import { numberToOne } from "../../../utils/mathHelper"

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

  const { data: inCategoriesData } = useGetAllInCategoriesQuery(null, {
    refetchOnMountOrArgChange: true,
  })

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

    const unitPriceHelper = (params) => {
      const { row, api, field } = params

      const { editRows } = api.state
      let ingredientId = row.ingredientId

      let unitPrice = 0

      if (editRows[row.id]?.ingredientId) {
        ingredientId = editRows[row.id].ingredientId?.value
        unitPrice = ingredients.find((item) => item.id === ingredientId)?.[
          field
        ]
      } else {
        unitPrice = row[field]
      }
      return numberToOne(unitPrice)
    }

    const costPriceHelper = (params, linkedField) => {
      const { row, api, field } = params

      const { editRows } = api.state
      let ingredientId = row.ingredientId

      let quantity = 0
      let costPrice = 0

      if (editRows[row.id]?.ingredientId) {
        ingredientId = editRows[row.id].ingredientId?.value
        quantity = editRows[row.id].quantity?.value
        costPrice =
          ingredients.find((item) => item.id === ingredientId)?.[linkedField] *
          quantity
      } else {
        costPrice = row[field]
      }
      return numberToOne(costPrice)
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
      ingredients && inCategories
        ? [
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
            },
            {
              field: "ingredientId",
              headerName: t("ingredientName"),
              width: 180,
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
            },

            {
              field: "quantity",
              headerName: t("quantity"),
              width: 110,
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
            },
            {
              field: "avgUnitPrice",
              headerName: t("avgUnitPrice"),
              width: 120,
              editable: false,
              filterable: false,
              sortable: false,
              valueGetter: unitPriceHelper,
            },
            {
              field: "avgCost",
              headerName: t("avgCost"),
              width: 120,
              editable: false,
              filterable: false,
              sortable: false,
              valueGetter: (params) => costPriceHelper(params, "avgUnitPrice"),
            },
            {
              field: "latestUnitPrice",
              headerName: t("latestUnitPrice"),
              width: 120,
              editable: false,
              filterable: false,
              sortable: false,
              valueGetter: unitPriceHelper,
            },
            {
              field: "latestCost",
              headerName: t("latestCost"),
              width: 120,
              editable: false,
              filterable: false,
              sortable: true,
              valueGetter: (params) =>
                costPriceHelper(params, "latestUnitPrice"),
            },

            {
              field: "description",
              headerName: t("description"),
              width: 250,
              filterable: false,
              editable: true,
              sortable: true,
              renderCell: renderCellExpand,
              filterOperators: getGridStringOperators().filter(
                (operator) => operator.value === "contains"
              ),
            },
            {
              field: "createdByName",
              headerName: t("createdByName"),
              width: 130,
              editable: false,
              filterable: true,
              renderCell: renderCellExpand,
              filterOperators: getGridStringOperators().filter(
                (operator) => operator.value === "equals"
              ),
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
  }, [t, isAllowedEdit, currentUser, ingredients, inCategories])
  return tableColumns
}
export default useTableColumns
