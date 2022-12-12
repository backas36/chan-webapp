import { Backdrop, CircularProgress } from "@mui/material"

const PageLoading = () => {
  return (
    <Backdrop open={true} sx={{ zIndex: (them) => them.zIndex.modal + 1 }}>
      <CircularProgress sx={{ color: "primary.main" }} />
    </Backdrop>
  )
}

export default PageLoading
