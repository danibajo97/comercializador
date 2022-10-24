import { DateTime } from 'luxon'

export default {
  toISODate,
  toJSDate,
  setDate
}

function datetime ({ date }) {
  return DateTime.fromJSDate(new Date(date)).plus({ days: 1 })
}

function toISODate ({ date }) {
  return datetime({ date }).toISODate()
}

function toJSDate ({ date }) {
  return datetime({ date }).toJSDate()
}

function setDate ({ date, days }) {
  return datetime({ date }).plus({ days: parseInt(days) }).toJSDate()
}
