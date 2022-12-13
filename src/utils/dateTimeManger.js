import { format, formatDistanceToNow, parseISO, formatISO } from "date-fns"

export const formatLocaleTime = (dateTime) => {
  if (dateTime) {
    return format(new Date(dateTime), "yyyy-MM-dd HH:mm")
  }
}

export const timeDistance = (dateTime) => {
  if (dateTime) {
    const temp = parseISO(dateTime)
    return formatDistanceToNow(temp)
  }
}

export const formatDateTime = (value) =>
  format(new Date(value), "yyyy-MM-dd HH:mm")

export const formatDate = (value) => format(value, "yyyy-MM-dd")

export const formatISODate = (value, representation) =>
  formatISO(new Date(value), {
    representation,
  })
