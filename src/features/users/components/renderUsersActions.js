import React from "react"
import { Box } from "@mui/system"
import { useEffect } from "react"
import { useGridApiContext, GridRowModes } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import { Cancel, Loop, Delete, Edit, Save, Send } from "@mui/icons-material"
import { useTranslation } from "react-i18next"

import {
  useDeleteUserMutation,
  useSendActivateMailMutation,
} from "../services/usersApiSlice"
import { customToast } from "../../../components/notify/NotifyToast"
import { USER_STATUS } from "../../../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { selectRowModesModel, setRowModesModel } from "../services/usersSlice"
import useToggle from "../../../hooks/useToggle"
import ConfirmDialog from "../../../components/dialog/ConfirmDialog"
import { te } from "date-fns/locale"

const TableActions = (props) => {
  const { t } = useTranslation()
  const { row } = props
  const dispatch = useDispatch()
  const rowModesModel = useSelector(selectRowModesModel)
  const { multiViable: dialogOpen, handleSetMultiVisibility: setDialogOpen } =
    useToggle({
      sendDialog: false,
      delDialog: false,
    })
  const { id } = row
  const isEditedMode = rowModesModel?.[id]?.mode === GridRowModes.Edit

  const [deleteUser, { isLoading: delLoading }] = useDeleteUserMutation()
  const [sendActivate, { isLoading: sendLoading, isSuccess: sendSuccess }] =
    useSendActivateMailMutation()

  const handleSaveClick = () => {
    dispatch(
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    )
  }

  const handleDeleteClick = async () => {
    setDialogOpen("delDialog")
    await deleteUser(id)
  }

  const handleCancelClick = () => {
    dispatch(
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      })
    )
  }
  const handleEditClick = () => {
    dispatch(
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.Edit },
      })
    )
  }

  const handleSendActivate = async () => {
    setDialogOpen("sendDialog")
    await sendActivate(id)
  }

  useEffect(() => {
    if (sendSuccess) {
      customToast.success("sendSuccess")
    }
  }, [sendSuccess])

  let content

  if (isEditedMode) {
    content = (
      <>
        <IconButton onClick={handleSaveClick} color="warning">
          <Save />
        </IconButton>
        <IconButton onClick={handleCancelClick} color="textPrimary">
          <Cancel />
        </IconButton>
      </>
    )
  } else {
    content = (
      <>
        {row.status === USER_STATUS.temporary && (
          <ConfirmDialog
            open={dialogOpen.sendDialog}
            handleClose={() => setDialogOpen("sendDialog")}
            title={t("sendMail")}
            desc={t("sendActivateMailDesc")}
            handleConfirm={handleSendActivate}
          >
            <IconButton
              disabled={sendLoading}
              onClick={() => setDialogOpen("sendDialog")}
              color="warning"
            >
              {sendLoading ? <Loop /> : <Send />}
            </IconButton>
          </ConfirmDialog>
        )}

        <IconButton onClick={handleEditClick} color="textPrimary">
          <Edit />
        </IconButton>
        <ConfirmDialog
          open={dialogOpen.delDialog}
          handleClose={() => setDialogOpen("delDialog")}
          title={t("delConfirm")}
          desc={t("delAccDesc")}
          handleConfirm={handleDeleteClick}
        >
          <IconButton
            disabled={delLoading}
            onClick={() => setDialogOpen("delDialog")}
            color="textPrimary"
          >
            {delLoading ? <Loop /> : <Delete />}
          </IconButton>
        </ConfirmDialog>
      </>
    )
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      {content}
    </Box>
  )
}

const renderUsersActions = (params) => {
  return <TableActions row={params.row} />
}

export default renderUsersActions
