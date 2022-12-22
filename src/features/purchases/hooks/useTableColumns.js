import {
  getGridNumericOperators,
  getGridSingleSelectOperators,
  getGridStringOperators,
} from "@mui/x-data-grid"
import { useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import renderCellExpand from "../../../components/Table/renderCellExpand"
import { selectCurrentUser } from "../../me"
import { getAllowRoles } from "../../../utils/constants"
import { formatDate, formatDateTime } from "../../../utils/dateTimeManger"
import { validateField } from "../utils"

import renderDateCell from "../../../components/Table/renderDateCell"
import renderActions from "../components/renderActions"
import { useGetAllSuppliersQuery, useGetSupplier } from "../../suppliers"
import renderReadOnlyCell from "../../../components/Table/renderReadOnlyCell"
import { useGetAllIngredientsQuery, useGetIngredient } from "../../ingredients"

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

  const { data: ingredientsData } = useGetAllIngredientsQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  const { data: suppliersData } = useGetAllSuppliersQuery(null, {
    refetchOnMountOrArgChange: true,
  })
  const suppliers = suppliersData?.data
  const ingredients = ingredientsData?.data
  const isAllowedEdit = useCallback(
    () => getAllowRoles(true, true).includes(currentUser?.role),
    [currentUser?.role]
  )

  const tableColumns = useMemo(() => {
    let columns = [
      {
        field: "supplierId",
        headerName: t("supplierName"),
        width: 150,
        editable: true,
        type: "singleSelect",
        valueOptions:
          suppliers &&
          suppliers.map((supplier) => ({
            label: supplier.name,
            value: supplier.id,
          })),
        valueGetter: ({ value }) => {
          if (!value) {
            return suppliers && suppliers[0].id
          }
          return (
            suppliers &&
            suppliers.find((supplier) => supplier.id === value).name
          )
        },
        headerClassName: "must-input--header",
        preProcessEditCellProps: (params) =>
          preProcessCell(params, "supplierId"),
      },
      {
        field: "ingredientId",
        headerName: t("ingredientName"),
        width: 150,
        editable: true,
        type: "singleSelect",
        valueOptions:
          ingredients &&
          ingredients.map((ingredient) => ({
            label: ingredient.name,
            value: ingredient.id,
          })),
        valueGetter: ({ value }) => {
          if (!value) {
            return ingredients && ingredients[0].id
          }
          return (
            ingredients &&
            ingredients.find((ingredient) => ingredient.id === value).name
          )
        },
        headerClassName: "must-input--header",
        preProcessEditCellProps: (params) =>
          preProcessCell(params, "ingredientId"),
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
        width: 100,
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
        field: "purchaseUnitPrice",
        headerName: t("unitPrice"),
        width: 80,
        type: "number",
        headerAlign: "left",
        editable: false,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridNumericOperators().filter(
          (operator) => operator.value === "="
        ),
        headerClassName: "must-input--header",
        preProcessEditCellProps: (params) => {
          return preProcessCell(params, "unitPrice")
        },
        valueGetter: (params) => {
          const { id } = params.row
          let purchasePrice = 0
          let quantity = 0
          if (params.api.state?.editRows?.[id]) {
            purchasePrice =
              params.api.state?.editRows?.[id].purchasePrice?.value || 0
            quantity = params.api.state?.editRows?.[id].quantity?.value || 1
          } else {
            purchasePrice = params.row.purchasePrice
            quantity = params.row.quantity
          }
          return Math.ceil(purchasePrice / quantity)
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
        valueFormatter: (params) => {
          const purchaseDate = params.value
          return purchaseDate ? formatDate(purchaseDate) : "-"
        },
        filterable: false,
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
        filterable: false,
        preProcessEditCellProps: (params) =>
          preProcessCell(params, "ingredientExpDate"),
        headerClassName: "must-input--header",
      },
      {
        field: "brand",
        headerName: t("brand"),
        width: 120,
        editable: false,
        filterable: true,
        renderCell: (params) =>
          renderReadOnlyCell(params, useGetIngredient, "ingredientId"),
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        cellClassName: "default-value--cell",
      },
      {
        field: "unit",
        headerName: t("unit"),
        width: 80,
        type: "number",
        headerAlign: "left",
        editable: false,
        filterable: true,
        renderCell: (params) =>
          renderReadOnlyCell(params, useGetIngredient, "ingredientId"),
        filterOperators: getGridNumericOperators().filter(
          (operator) => operator.value === "="
        ),
        cellClassName: "default-value--cell",
      },
      {
        field: "size",
        headerName: t("size"),
        width: 80,
        editable: false,
        filterable: true,
        renderCell: (params) =>
          renderReadOnlyCell(params, useGetIngredient, "ingredientId"),
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        cellClassName: "default-value--cell",
      },
      {
        field: "sku",
        headerName: t("sku"),
        width: 100,
        editable: false,
        filterable: true,
        renderCell: (params) =>
          renderReadOnlyCell(params, useGetIngredient, "ingredientId"),
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        cellClassName: "default-value--cell",
      },
      {
        field: "type",
        headerName: t("supplierType"),
        width: 120,
        editable: false,
        filterable: true,
        renderCell: (params) =>
          renderReadOnlyCell(params, useGetSupplier, "supplierId"),
        filterOperators: getGridSingleSelectOperators().filter(
          (operator) => operator.value === "is"
        ),
        type: "singleSelect",
        valueOptions: suppliers && suppliers.map((supplier) => supplier.name),
      },
      {
        field: "createdByName",
        headerName: t("createdByName"),
        width: 120,
        editable: true, //TODO
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
