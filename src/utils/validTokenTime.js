export const validTokenTime = (token) => {
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const expiration = new Date(payload.exp * 1000)
    const now = new Date()
    return expiration.getTime() > now.getTime()
  }
  return false
}
