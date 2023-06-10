/** Gets the correct value for the HTML datetime-local input */
export const getHTMLFormat = (datetime: Date) => {
  const offset = datetime.getTimezoneOffset()

  datetime.setMinutes(datetime.getMinutes() - offset)

  return datetime.toISOString().slice(0, 16)
}

/** Check if the event should be marked as allDay */
export const checkAllDayEvent = (start: Date, end: Date) => {
  const startTime = start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds()
  const endTime = end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds()

  // Check if both times are midnight
  if (startTime === '0:0:0' && endTime === '0:0:0') {
    // Check its only one day
    const difference = end.getTime() - start.getTime()
    return difference === 86400000
  } else {
    return false
  }
}