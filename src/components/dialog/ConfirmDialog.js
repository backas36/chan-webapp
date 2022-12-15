import { Close } from "@mui/icons-material"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material"

const stopPropagationForTab = (event) => {
  if (event.key === "Tab") {
    event.stopPropagation()
  }
}
const MIconButton = styled(IconButton)(({ theme }) => {
  return {
    position: "absolute",
    top: 8,
    right: 8,
    color: theme.palette.grey[500],
  }
})

const ConfirmDialog = (props) => {
  const { children, open, handleClose, title, desc, handleConfirm } = props
  return (
    <>
      {children}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        onKeyDown={stopPropagationForTab}
      >
        <DialogTitle>
          {title}
          <MIconButton onClick={handleClose}>
            <Close />
          </MIconButton>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>{desc}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default ConfirmDialog
