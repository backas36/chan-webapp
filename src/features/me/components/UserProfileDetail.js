import { Form, FormikProvider, useFormik } from "formik"
import {
  Box,
  Grid,
  Divider,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../services/meSlice"
import { useUpdateMyProfileMutation } from "../services/meApiSlice"
import { useMemo } from "react"
import { customToast } from "../../../components/notify/NotifyToast"
import { FDatePicker, FLoadingBtn, FTextfield } from "../../../components/form"
import { checkUserIdentityType } from "../utils/checkUserIdentityType"
import { formatISODate, formatLocaleTime } from "../../../utils/dateTimeManger"
import { profileSchema } from "../utils/schema"
import { useTranslation } from "react-i18next"

const UserProfileDetail = () => {
  const { t } = useTranslation()
  const currentUser = useSelector(selectCurrentUser)
  const [updateMyProfile] = useUpdateMyProfileMutation()

  const getUserValue = useMemo(() => {
    const actionUser = currentUser
    return {
      ...actionUser,
      birthDate: actionUser?.birthDate ? Date.parse(actionUser?.birthDate) : "",
      lastLoginAt: formatLocaleTime(actionUser?.lastLoginAt) || "",
    }
  }, [currentUser])

  const formik = useFormik({
    initialValues: getUserValue,
    enableReinitialize: true,
    validationSchema: profileSchema(),
    onSubmit: async (values) => {
      if (values?.birthDate) {
        values.birthDate = formatISODate(values?.birthDate, "date")
      } else {
        values.birthDate = null
      }

      if (currentUser) {
        await updateMyProfile(values)
      }
      customToast.success("updatedSuccess")
    },
  })

  return (
    <Grid item xs={12} md={6}>
      <FormikProvider value={formik}>
        <Form autoComplete="on" noValidate>
          <Card>
            <CardHeader
              subheader={t("editInformation")}
              title={t("profileDetail")}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <FTextfield
                    label={t("email")}
                    name="email"
                    variant="outlined"
                    required={true}
                  />
                </Grid>

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
                  <FDatePicker
                    name="birthDate"
                    label={t("dob")}
                    timeType="date"
                  />
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
                  <FTextfield
                    label={t("role")}
                    name="role"
                    variant="outlined"
                    disabled={true}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FTextfield
                    label={t("lastLoginAt")}
                    name="lastLoginAt"
                    variant="outlined"
                    disabled={true}
                  />
                </Grid>
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
