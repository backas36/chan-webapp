import {
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { Feed } from "@mui/icons-material"

import { useGetActionLogListQuery } from "../services/actionLogApiSlice"
import MAvatar from "../../../components/Avatar/MAvatar"
import { timeDistance } from "../../../utils/dateTimeManger"

const RecentlyActionsCard = () => {
  const { t } = useTranslation()
  const { data: actionList, isLoading } = useGetActionLogListQuery(
    { n: 10 },
    { refetchOnMountOrArgChange: true }
  )
  return (
    <Card sx={{ height: "100%", textAlign: "center" }}>
      <CardContent>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            {t("recentlyActivities")}
          </Typography>
          <List>
            {isLoading && <CircularProgress sx={{ color: "primary.main" }} />}
            {actionList?.data &&
              actionList?.data.slice(0, 10).map((row, i) => (
                <Box key={row.id}>
                  {/*  TODO dynamic change icon by subject */}
                  <ListItem sx={{ py: 0 }}>
                    <ListItemAvatar>
                      <MAvatar>
                        <Feed />
                      </MAvatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          color="primary"
                          sx={{
                            fontWeight: 600,
                          }}
                          variant="body"
                        >
                          {row.relatedUserName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            sx={{ display: "inline", fontWeight: 500 }}
                          >
                            {row.subject}
                          </Typography>
                          <br />

                          {` ${timeDistance(row?.createdAt)} ago`}
                        </>
                      }
                    />
                  </ListItem>
                </Box>
              ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  )
}
export default RecentlyActionsCard
