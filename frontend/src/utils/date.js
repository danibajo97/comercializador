import { DateTime } from 'luxon'

export default {
  dateFormat
}

function dateFormat ({ date }) {
  return DateTime.fromJSDate(new Date(date)).toISODate()
}
