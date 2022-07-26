export const generateArrayDate = (startdate, enddate) => {
  console.log(startdate, enddate)
  const arr = {}
  if (!(startdate instanceof Date) || !(enddate instanceof Date)) {
    startdate = new Date(startdate)
    enddate = new Date(enddate)
  }
  let currentDate = startdate
  let zIndex = 31
  while (currentDate <= enddate) {
    arr[currentDate.getTime()] = { zIndex, data: [] }
    currentDate.setDate(currentDate.getDate() + 1)
    currentDate = new Date(currentDate)
    zIndex -= 1
  }
  return arr
}
