import { LoadingButton } from "@mui/lab"
import {
  Box,
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
  CardActions,
  Badge,
  Avatar,
} from "@mui/material"
import { useSelector } from "react-redux"
import { useState } from "react"
import { Delete, RestartAlt } from "@mui/icons-material"
import { useTranslation } from "react-i18next"

import MAvatar from "../../../components/Avatar/MAvatar"
import { useUpdateMyProfileMutation } from "../services/meApiSlice"
import { selectCurrentUser } from "../services/meSlice"
import { checkUserIdentityType } from "../utils/checkUserIdentityType"
import deleteFile from "../../../services/firebase/deleteFile"
import { uploadUserPhoto } from "../../../services/firebase/uploadFile"
import { AUTH_OPTIONS, checkIdentityType } from "../../../utils/constants"

const UserAvatar = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState()
  const currentUser = useSelector(selectCurrentUser)
  const [updateMyProfile] = useUpdateMyProfileMutation()
  const { photoUrl, name, email, id } = currentUser
  const isAllowEditPhoto =
    !!photoUrl &&
    checkIdentityType(AUTH_OPTIONS.chanchan, currentUser.identityType)
  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      URL.createObjectURL(file)
      try {
        setLoading(true)
        if (isAllowEditPhoto) {
          const imageName = photoUrl
            ?.split(`${currentUser?.id}%2F`)[1]
            ?.split("?")[0]
          await deleteFile(`profile/${id}/${imageName}`)
        }
        const newPhotoUrl = await uploadUserPhoto(file, id)
        await updateMyProfile({ ...currentUser, photoUrl: newPhotoUrl })
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
  }
  const handleDeleteAvatar = async () => {
    try {
      setLoading(true)
      if (isAllowEditPhoto) {
        const imageName = photoUrl
          ?.split(`${currentUser?.id}%2F`)[1]
          ?.split("?")[0]
        await deleteFile(`profile/${id}/${imageName}`)
      }
    } catch (err) {
    } finally {
      await updateMyProfile({ ...currentUser, photoUrl: null })
      setLoading(false)
    }
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent sx={{ pt: 5, pb: 2 }}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Badge
              onClick={handleDeleteAvatar}
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              badgeContent={
                <Avatar
                  sx={{
                    display: isAllowEditPhoto ? "flex" : "none",
                    width: 30,
                    height: 30,
                    bgcolor: (theme) => theme.palette.success.light,
                    border: (theme) =>
                      `2px solid ${theme.palette.background.paper}`,
                  }}
                >
                  {loading ? <RestartAlt /> : <Delete color="error" />}
                </Avatar>
              }
            >
              <MAvatar
                src={photoUrl || ""}
                sx={{
                  height: 120,
                  mb: 2,
                  width: 120,
                  bgcolor: (theme) => theme.palette.success.dark,
                }}
              >
                {!isAllowEditPhoto && name.charAt(0).toUpperCase()}
              </MAvatar>
            </Badge>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h4"
              fontWeight={700}
            >
              {name}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {email}
            </Typography>
          </Box>
        </CardContent>
        {checkUserIdentityType && (
          <>
            <Divider />
            <CardActions sx={{ justifyContent: "center" }}>
              <input
                hidden
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="avatar-upload">
                <LoadingButton
                  loading={loading}
                  component="span"
                  color="primary"
                  fullWidth
                  variant="text"
                >
                  {t("uploadPic")}
                </LoadingButton>
              </label>
            </CardActions>
          </>
        )}
      </Card>
    </Grid>
  )
}
export default UserAvatar
