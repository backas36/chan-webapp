import { Paper, Popper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useRef, useState } from "react"
function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  )
}

const TableCellExpand = React.memo((props) => {
  let { width, value } = props
  if (value) {
    value = typeof value === "object" ? JSON.stringify(value) : value
  } else {
    value = "-"
  }
  const cellDiv = useRef(null)
  const cellValue = useRef(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [showFullCell, setShowFullCell] = useState(false)
  const [showPopper, setShowPopper] = useState(false)

  const wrapper = useRef(null)

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current)
    setShowPopper(isCurrentlyOverflown)
    setAnchorEl(cellDiv.current)
    setShowFullCell(true)
  }

  const handleMouseLeave = () => {
    setShowFullCell(false)
  }

  useEffect(() => {
    if (!showFullCell) {
      return undefined
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
        setShowFullCell(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [setShowFullCell, showFullCell])

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: "center",
        lineHeight: "24px",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: "100%",
          width,
          display: "block",
          position: "absolute",
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, maxWidth: "300px" }}
          placement="bottom"
        >
          <Paper
            elevation={1}
            style={{
              minHeight: wrapper.current.offsetHeight - 3,
            }}
          >
            <Typography
              variant="body2"
              style={{
                padding: 8,
                wordBreak: "break-all",
              }}
            >
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  )
})

const renderCellExpand = (params) => {
  return (
    <TableCellExpand value={params.value} width={params.colDef.computedWidth} />
  )
}
export default renderCellExpand
