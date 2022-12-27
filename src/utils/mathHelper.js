export const numberToTwo = (num) => {
  if (!typeof num === "number" || isNaN(num)) {
    return
  }
  return Math.round(num * 100) / 100
}
