import { Form, FormikProvider, useFormik } from "formik"
import {
  Box,
  Grid,
  Divider,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../services/meSlice"
import { useUpdateMyProfileMutation } from "../services/meApiSlice"
import { useEffect, useMemo } from "react"
import { customToast } from "../../../components/notify/NotifyToast"
import {
  FDatePicker,
  FLoadingBtn,
  FSelect,
  FTextfield,
} from "../../../components/form"
import { USER_ROLES, USER_STATUS } from "../../../utils/constants"
import { checkUserIdentityType } from "../utils/checkUserIdentityType"
import { formatISODate, formatLocaleTime } from "../../../utils/dateTimeManger"
import { initUserVal } from "../utils/initUserVal"
import { profileSchema } from "../utils/schema"
import { useTranslation } from "react-i18next"
import { useAddUserMutation } from "../../users"

const UserProfileDetail = ({ createByAdmin }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const [updateMyProfile] = useUpdateMyProfileMutation()
  const [createUser, { isSuccess }] = useAddUserMutation()

  const getUserValue = useMemo(() => {
    const actionUser = currentUser
    return {
      ...actionUser,
      birthDate: actionUser?.birthDate ? Date.parse(actionUser?.birthDate) : "",
      lastLoginAt: formatLocaleTime(actionUser?.lastLoginAt) || "",
    }
  }, [currentUser])

  const formik = useFormik({
    initialValues: createByAdmin ? initUserVal : getUserValue,
    enableReinitialize: true,
    validationSchema: profileSchema(createByAdmin),
    onSubmit: async (values) => {
      if (values?.birthDate) {
        values.birthDate = formatISODate(values?.birthDate, "date")
      } else {
        values.birthDate = null
      }

      if (createByAdmin) {
        await createUser(values)
        return
      }

      if (currentUser) {
        await updateMyProfile(values)
      }
      customToast.success("updatedSuccess")
    },
  })

  useEffect(() => {
    if (isSuccess) {
      customToast.success("createdSuccess")
      navigate(-1)
    }
  }, [isSuccess, navigate])
  return (
    <Grid item xs={12} md={createByAdmin ? 12 : 6}>
      <FormikProvider value={formik}>
        <Form autoComplete="on" noValidate>
          <Card>
            <CardHeader
              subheader={t("editInformation")}
              title={t("profileDetail")}
            />
            <CardContent>
              <Grid container spacing={3}>
                {createByAdmin && (
                  <Grid item md={12} xs={12}>
                    <FTextfield
                      label={t("email")}
                      name="email"
                      variant="outlined"
                      required={true}
                      disabled={!createByAdmin}
                    />
                  </Grid>
                )}

                <Grid item md={6} xs={12}>
                  <FTextfield
                    label={t("name")}
                    name="name"
                    variant="outlined"
                    required={true}
                    disabled={!checkUserIdentityType}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FDatePicker name="birthDate" label={t("dob")} />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FTextfield
                    label={t("mobile")}
                    name="mobile"
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FTextfield
                    label={t("lineId")}
                    name="lineId"
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <FTextfield
                    label={t("address")}
                    name="address"
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  {createByAdmin ? (
                    <>
                      <FSelect
                        label={t("role")}
                        name="role"
                        options={USER_ROLES}
                        required={true}
                      />
                    </>
                  ) : (
                    <FTextfield
                      label={t("role")}
                      name="role"
                      variant="outlined"
                      disabled={true}
                    />
                  )}
                </Grid>
                <Grid item md={6} xs={12}>
                  {createByAdmin && (
                    <>
                      <FSelect
                        label={t("status")}
                        name="status"
                        options={USER_STATUS}
                        required={true}
                        disabled={true}
                      />
                    </>
                  )}
                </Grid>
                {!createByAdmin && (
                  <Grid item md={6} xs={12}>
                    <FTextfield
                      label={t("lastLoginAt")}
                      name="lastLoginAt"
                      variant="outlined"
                      disabled={true}
                    />
                  </Grid>
                )}
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
              }}
            >
              <FLoadingBtn
                fullWidth={false}
                sx={{ width: { xs: "100%", md: "30%" } }}
              >
                {t("submit")}
              </FLoadingBtn>
            </Box>
          </Card>
        </Form>
      </FormikProvider>
    </Grid>
  )
}
export default UserProfileDetail
