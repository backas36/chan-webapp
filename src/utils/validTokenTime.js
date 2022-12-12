export const validTokenTime = (token) => {
  if (token) {
    const getPayload = JSON.parse(atob(token.split(".")[1]))
    const payload = getPayload(token.get("token"))
    const expiration = new Date(payload.exp * 1000)
    const now = new Date()
    return expiration.getTime() > now.getTime()
  }
  return false
}
