import moment from 'moment-timezone'

export const generateData = (arrReport = [], arrDate = [], endMonth, startDateIteration) => {
  // console.log(startDateIteration)
  let cloneArrReport = arrReport
  if (startDateIteration) {
    cloneArrReport = arrReport.filter(data => {
      const tmpStartDate = new Date(moment.utc(data.start_at).format('YYYY-MM-DD'))
      return tmpStartDate.getTime() >= startDateIteration.getTime() && !data.placed
    })
  }
  const actualStartMonth = new Date(moment().startOf('month').format('YYYY-MM-DD'))
  const actualEndMonth = new Date(moment().endOf('month').format('YYYY-MM-DD'))
  for (const arr of cloneArrReport) {
    // console.log(startDateIteration, arr.name, 1)
    if (!arr.placed) {
      const startdate = new Date(moment.utc(arr.start_at).format('YYYY-MM-DD'))
      let enddate
      if (arr.end_at) {
        enddate = (new Date(moment.utc(arr.end_at).format('YYYY-MM-DD')))
      } else {
        if (startdate.getTime() < actualStartMonth.getTime()) {
          enddate = endMonth
        } else if (startdate.getTime() > actualEndMonth.getTime()) {
          enddate = startdate
        } else {
          enddate = new Date()
        }
      }
      // console.log(arr.name, 2)
      const diffdate = enddate.getDate() - startdate.getDate()
      // console.log(diffdate, enddate.getDate(), startdate.getDate())
      for (var j = 0; j <= diffdate; j++) {
        if (j === 0) {
          arrDate[startdate.getTime()].data.push({ ...arr, workdate: diffdate + 1, null: false })
          continue
        }
        startdate.setDate(startdate.getDate() + 1)
        arrDate[startdate.getTime()].data.push({ id: arr.id, workdate: diffdate + 1, null: true })
      }
      arr.placed = true
      // console.log(arr.name, 3)
      const diffUntilEndMonth = endMonth.getDate() - enddate.getDate()
      for (var h = 1; h <= diffUntilEndMonth; h++) {
        const nextdate = new Date(moment.utc(arr.start_at).format('YYYY-MM-DD'))
        nextdate.setDate(enddate.getDate() + h)
        if (arrDate[startdate.getTime()].data.length - arrDate[nextdate.getTime()].data.length === 1) {
          // console.log(arr.name, 66)
          const indexNextData = arrReport.findIndex((a) => {
            const aDate = new Date(moment.utc(a.start_at).format('YYYY-MM-DD'))
            return aDate.getTime() === nextdate.getTime() && !a.placed
          })
          if (indexNextData !== -1) {
            // console.log(arr.name, 666)
            const sdate = new Date(moment.utc(arrReport[indexNextData].start_at).format('YYYY-MM-DD'))
            generateData(arrReport, arrDate, endMonth, sdate)
            break
          }
        }
      }
      if (startDateIteration) {
        break
      }
      // console.log(arr.name, 4)
    }
  }
}
