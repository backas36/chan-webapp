import { Avatar } from "@mui/material"

const MAvatar = ({ children, source, ...otherProps }) => {
  const avatarConfig = {
    ...(source && { src: source }),
    ...otherProps,
    imgProps: { referrerPolicy: "no-referrer" },
    sx: {
      bgcolor: (theme) => theme.palette.secondary.dark,
      ...otherProps.sx,
    },
  }
  return <Avatar {...avatarConfig}>{children}</Avatar>
}

export default MAvatar
