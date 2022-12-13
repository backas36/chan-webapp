import React from "react"
import { Box } from "@mui/system"
import { useEffect } from "react"
import { useGridApiContext, GridRowModes } from "@mui/x-data-grid"
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material"
import { Cancel, Loop, Delete, Edit, Save, Send } from "@mui/icons-material"
import {
  useDeleteUserMutation,
  useSendActivateMailMutation,
} from "../services/usersApiSlice"
import { customToast } from "../../../components/notify/NotifyToast"
import { USER_STATUS } from "../../../utils/constants"
import MDialog from "../../../components/dialog/MDialog"
import { useDispatch, useSelector } from "react-redux"
import { selectRowModesModel, setRowModesModel } from "../services/usersSlice"
import useToggle from "../../../hooks/useToggle"

const TableActions = (props) => {
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
      customToast.success("Send success")
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
          <MDialog
            open={dialogOpen.sendDialog}
            handleClose={() => setDialogOpen("sendDialog")}
            title="Send activate mail ?"
            dialogBtn={
              <IconButton
                disabled={sendLoading}
                onClick={() => setDialogOpen("sendDialog")}
                color="warning"
              >
                {sendLoading ? <Loop /> : <Send />}
              </IconButton>
            }
          >
            <DialogContent>
              <DialogContentText>
                Are you sure you want to send activate mail to this account ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen("sendDialog")}>
                Cancel
              </Button>
              <Button color="error" onClick={handleSendActivate} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </MDialog>
        )}

        <IconButton onClick={handleEditClick} color="textPrimary">
          <Edit />
        </IconButton>
        <MDialog
          open={dialogOpen.delDialog}
          handleClose={() => setDialogOpen("delDialog")}
          title="Delete this Account ?"
          dialogBtn={
            <IconButton
              disabled={delLoading}
              onClick={() => setDialogOpen("delDialog")}
              color="textPrimary"
            >
              {delLoading ? <Loop /> : <Delete />}
            </IconButton>
          }
        >
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this account ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen("delDialog")}>Cancel</Button>
            <Button color="error" onClick={handleDeleteClick} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </MDialog>
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
