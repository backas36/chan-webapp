import { format } from "date-fns"

export const formatLocaleTime = (dateTime) => {
  if (dateTime) {
    return format(new Date(dateTime), "yyyy-MM-dd HH:mm")
  }
}
