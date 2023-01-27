export const asDDMMYYYY = (date: Date) => {
  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
}
