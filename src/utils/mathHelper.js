export const numberToOne = (num) => {
  if (!typeof num === "number" || isNaN(num)) {
    return
  }
  return Math.round(num * 10) / 10
}
