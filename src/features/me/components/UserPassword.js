import { styled } from "@mui/system"
import { Formik, Form } from "formik"
import { Key } from "@mui/icons-material"
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  MenuItem,
  ListItemIcon,
} from "@mui/material"

import useToggle from "../../../hooks/useToggle"
import { FPwdTextfield, FLoadingBtn } from "../../../components/form"
import { useUpdateMyPwdMutation } from "../services/meApiSlice"
import { pwdSchema } from "../utils/pwdSchema"
import MDialog from "../../../components/dialog/MDialog"
import initPassword from "../utils/initPassword"
import { useTranslation } from "react-i18next"

const MBox = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
  }
})

const UserPassword = ({ isOpen, handleClose, openDialog }) => {
  const { t } = useTranslation()

  const [updateMyPwd] = useUpdateMyPwdMutation()

  const {
    multiViable: showPasswords,
    handleSetMultiVisibility: handleShowPasswords,
  } = useToggle({
    originalPassword: false,
    newPassword: false,
    newOkPassword: false,
  })

  const formikConfig = {
    initialValues: initPassword,
    validationSchema: pwdSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await updateMyPwd(values)
      handleClose()
    },
  }

  return (
    <>
      <MDialog
        open={isOpen}
        handleClose={handleClose}
        title="Password"
        dialogBtn={
          <MenuItem onClick={openDialog}>
            <ListItemIcon>
              <Key fontSize="small" />
            </ListItemIcon>
            {t("password")}
          </MenuItem>
        }
      >
        <Formik {...formikConfig}>
          <Form>
            <DialogContent dividers sx={{ pb: "50px", height: "430px" }}>
              <DialogContentText sx={{ my: 2 }}>
                Please fill your password in the fields below
              </DialogContentText>
              <MBox gap={2}>
                <FPwdTextfield
                  name="originalPassword"
                  label="Origin Password"
                  isShowValue={showPasswords.originalPassword}
                  setIsShowValue={() => handleShowPasswords("originalPassword")}
                />
                <FPwdTextfield
                  name="newPassword"
                  label="New Password"
                  isShowValue={showPasswords.newPassword}
                  setIsShowValue={() => handleShowPasswords("newPassword")}
                />
                <FPwdTextfield
                  name="newOkPassword"
                  label="Confirm New Password"
                  isShowValue={showPasswords.newOkPassword}
                  setIsShowValue={() => handleShowPasswords("newOkPassword")}
                />
              </MBox>
            </DialogContent>
            <DialogActions sx={{ px: "19px", py: "30px" }}>
              <FLoadingBtn sx={{ width: "20%" }}>Submit</FLoadingBtn>
            </DialogActions>
          </Form>
        </Formik>
      </MDialog>
    </>
  )
}
export default UserPassword
