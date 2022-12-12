import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const useTitle = (title) => {
  const location = useLocation()
  const prefix = location.pathname.startsWith("/admin") ? "Admin" : "ChanChan"
  useEffect(() => {
    const prevTitle = document.title
    document.title = title ? `${prefix} | ${title}` : "ChanChan"
    return () => (document.title = prevTitle)
  }, [title, prefix])
}
export default useTitle
