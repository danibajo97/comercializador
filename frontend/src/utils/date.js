import { DateTime } from 'luxon'

export default {
  toISODate,
  toJSDate
}

function toISODate ({ date }) {
  return DateTime.fromJSDate(new Date(date)).toISODate()
}

function toJSDate ({ date }) {
  const dateMoreUno = new Date(date)
  dateMoreUno.setDate(new Date(date).getDate() + 1)
  return DateTime.fromJSDate(dateMoreUno).toJSDate()
}
