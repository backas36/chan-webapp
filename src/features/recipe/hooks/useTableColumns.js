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

    const costValueHelper = (params, monthBefore) => {
      const { row, api } = params
      const { editRows } = api.state
      let ingredientId = row.ingredientId

      let costList = row.costList
      let quantity = row.quantity

      if (editRows[row.id]?.ingredientId) {
        ingredientId = editRows[row.id].ingredientId?.value
        costList = ingredients?.find(
          (item) => item.id === ingredientId
        )?.costList
        quantity = editRows[row.id].quantity?.value
      }

      let priceList = costList?.map((cost) => cost.unitPrice)

      if (!priceList) {
        return null
      }

      if (monthBefore) {
        priceList = priceList.slice(0, monthBefore)
      }

      const avgCost =
        priceList.reduce((sum, next) => sum + next, 0) / priceList.length
      return numberToOne(avgCost * quantity)
    }
    let columns =
      ingredients && inCategories
        ? [
            {
              field: "categoryId",
              headerName: t("categoryName"),
              width: 130,
              editable: true,
              type: "singleSelect",
              valueOptions: inCategories.map((inCategory) => {
                return {
                  label: inCategory.name,
                  value: inCategory.id,
                }
              }),
              valueGetter: singleSelectValueGetter,
              valueFormatter: singleSelectValueFormat,
              valueParser: singleSelectValueParser,
              renderEditCell: (params) =>
                renderSingleSelectCell(params, "ingredientId"),
            },
            {
              field: "ingredientId",
              headerName: t("ingredientName"),
              width: 180,
              editable: true,
              type: "singleSelect",
              valueOptions: ({ row }) => {
                const selectedIngredients = ingredients.filter(
                  (ingredient) =>
                    ingredient.ingredientCategoryId === row.categoryId
                )
                const options = selectedIngredients.map((ingredient) => {
                  const { id, name } = ingredient
                  return {
                    label: `${name} `,
                    value: id,
                  }
                })
                return options
              },
              valueGetter: singleSelectValueGetter,
              valueFormatter: (params) => {
                const { value, field, api, id } = params
                const colDef = api.getColumn(field)
                const option = colDef
                  ?.valueOptions(api.getRowParams(id))
                  ?.find(({ value: optionValue }) => value === optionValue)
                return option?.label || value.label
              },
              preProcessEditCellProps: (params) =>
                preProcessCell(params, "ingredientId"),
            },

            {
              field: "quantity",
              headerName: t("quantity"),
              width: 130,
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
                if (!params.value) {
                  const { api, row } = params
                  const { editRows } = api.state
                  const selectedIngredientId =
                    editRows[row.id]?.ingredientId?.value
                  return ingredients.find(
                    (item) => item.id === selectedIngredientId
                  )?.sku
                }

                return params.value
              },
            },
            {
              field: "avgCost",
              headerName: t("avgCost"),
              width: 100,
              editable: false,
              filterable: false,
              sortable: false,
              headerAlign: "left",
              renderCell: renderCellExpand,
              valueGetter: (params) => costValueHelper(params),
            },
            {
              field: "latestCost",
              headerName: t("latestCost"),
              width: 100,
              editable: false,
              filterable: false,
              headerAlign: "left",
              renderCell: renderCellExpand,
              valueGetter: (params) => costValueHelper(params, 3),
            },
            {
              field: "description",
              headerName: t("description"),
              width: 250,
              filterable: false,
              editable: false,
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
