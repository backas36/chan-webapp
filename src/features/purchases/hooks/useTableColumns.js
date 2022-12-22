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
import { useGetAllInCategoriesQuery } from "../../ingredientCategory"
import renderDateCell from "../../../components/Table/renderDateCell"
import renderActions from "../components/renderActions"
import { useGetAllSuppliersQuery } from "../../suppliers"

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

  const { data: inCaData } = useGetAllInCategoriesQuery(null, {
    refetchOnMountOrArgChange: true,
  })
  const { data: suppliersData } = useGetAllSuppliersQuery(null, {
    refetchOnMountOrArgChange: true,
  })
  //const createEndPointSelector = (cacheKey) => {
  //  return selectorForCacheKey = () => {
  //    return
  //  }
  //}

  const isAllowedEdit = useCallback(
    () => getAllowRoles(true, true).includes(currentUser?.role),
    [currentUser?.role]
  )
  const tableColumns = useMemo(() => {
    return [
      {
        field: "actions",
        headerName: t("actions"),
        width: 100,
        type: "actions",
        renderCell: (params) => renderActions(params),
      },
      {
        field: "quantity",
        headerName: t("purchaseQuantity"),
        width: 100,
        type: "number",
        headerAlign: "left",
        editable: isAllowedEdit,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridNumericOperators().filter(
          (operator) => operator.value === "="
        ),
        preProcessEditCellProps: (params) => preProcessCell(params, "quantity"),
        headerClassName: "must-input--header",
      },
      {
        field: "unitPrice",
        headerName: t("unitPrice"),
        width: 80,
        type: "number",
        headerAlign: "left",
        editable: isAllowedEdit,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridNumericOperators().filter(
          (operator) => operator.value === "="
        ),
        preProcessEditCellProps: (params) =>
          preProcessCell(params, "unitPrice"),
        headerClassName: "must-input--header",
        valueGetter: (params) =>
          Math.ceil(params.row.purchasePrice / params.row.quantity),
      },
      {
        field: "purchasePrice",
        headerName: t("purchasePrice"),
        width: 100,
        type: "number",
        headerAlign: "left",
        editable: isAllowedEdit,
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
        field: "purchaseDate",
        headerName: t("purchaseDate"),
        width: 170,
        editable: isAllowedEdit,
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
        editable: isAllowedEdit,
        resizable: false,
        type: "date",
        renderEditCell: (params) => renderDateCell(params, false),
        valueFormatter: (params) => {
          const ingredientExpDate = params.value
          return ingredientExpDate ? formatDate(ingredientExpDate) : "-"
        },
        filterable: false,
        headerClassName: "must-input--header",
      },
      {
        field: "supplierName",
        headerName: t("supplierName"),
        width: 150,
        editable: false,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        preProcessEditCellProps: (params) =>
          preProcessCell(params, "supplierName"),
      },
      {
        field: "supplierType",
        headerName: t("supplierType"),
        width: 120,
        editable: false,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridSingleSelectOperators().filter(
          (operator) => operator.value === "is"
        ),
        preProcessEditCellProps: (params) =>
          preProcessCell(params, "supplierType"),
        type: "singleSelect",
        valueOptions:
          suppliersData?.data &&
          suppliersData?.data.map((supplier) => supplier.name),
      },
      {
        field: "ingredientName",
        headerName: t("ingredientName"),
        width: 180,
        editable: false,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        preProcessEditCellProps: (params) =>
          preProcessCell(params, "ingredientName"),
        cellClassName: "default-value--cell",
      },
      {
        field: "categoryName",
        headerName: t("categoryName"),
        width: 120,
        editable: false,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridSingleSelectOperators().filter(
          (operator) => operator.value === "is"
        ),
        preProcessEditCellProps: (params) => preProcessCell(params, "name"),
        type: "singleSelect",
        valueOptions: inCaData?.data && inCaData?.data.map((inCa) => inCa.name),
        cellClassName: "default-value--cell",
      },
      {
        field: "ingredientBrand",
        headerName: t("brand"),
        width: 120,
        editable: false,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        preProcessEditCellProps: (params) =>
          preProcessCell(params, "ingredientBrand"),
        cellClassName: "default-value--cell",
      },

      {
        field: "ingredientUnit",
        headerName: t("unit"),
        width: 80,
        type: "number",
        headerAlign: "left",
        editable: false,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridNumericOperators().filter(
          (operator) => operator.value === "="
        ),
        cellClassName: "default-value--cell",
      },
      {
        field: "ingredientSize",
        headerName: t("size"),
        width: 80,
        editable: isAllowedEdit,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        cellClassName: "default-value--cell",
      },
      {
        field: "ingredientSku",
        headerName: t("sku"),
        width: 100,
        editable: false,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        cellClassName: "default-value--cell",
      },

      {
        field: "createdByName",
        headerName: t("createdByName"),
        width: 120,
        editable: isAllowedEdit, //TODO
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        cellClassName: "default-value--cell",
      },
      {
        field: "createdAt",
        headerName: t("createdAt"),
        width: 150,
        filterable: false,
        renderCell: (params) => {
          const createdAt = params.value
          return createdAt ? formatDateTime(params?.row.createdAt) : "-"
        },
        cellClassName: "default-value--cell",
      },
    ]
  }, [t, isAllowedEdit, inCaData, suppliersData])
  return tableColumns
}
export default useTableColumns
