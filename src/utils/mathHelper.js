export const numberToOne = (num) => {
  if (!typeof num === "number") {
    return
  }
  return Math.round(num * 10) / 10
}
