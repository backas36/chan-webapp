import { Close } from "@mui/icons-material"
import { Dialog, DialogTitle, IconButton, styled } from "@mui/material"

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
const MDialog = (props) => {
  const { children, open, handleClose, title, dialogBtn } = props
  return (
    <>
      {dialogBtn}

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

        {children}
      </Dialog>
    </>
  )
}
export default MDialog
