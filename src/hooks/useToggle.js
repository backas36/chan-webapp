import { useState } from "react"

const useToggle = (initialState = false) => {
  const [visible, setVisibility] = useState(initialState)
  const [multiViable, setMultiVisibles] = useState(initialState)

  const setToggleStatus = (value) =>
    setVisibility((currentValue) =>
      typeof value === "boolean" ? value : !currentValue
    )
  const handleSetMultiVisibility = (key) => {
    return setMultiVisibles({
      ...multiViable,
      [key]: !multiViable[key],
    })
  }

  return {
    visible,
    setToggleStatus,
    multiViable,
    handleSetMultiVisibility,
  }
}

export default useToggle
