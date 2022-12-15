import { DateTime } from 'luxon'

export default {
  toISODate,
  toJSDate,
  setDate
}

function datetime ({ date, days = 1 }) {
  return DateTime.fromJSDate(new Date(date)).plus({ days })
}

function toISODate ({ date, days = 1 }) {
  return datetime({ date, days }).toISODate()
}

function toJSDate ({ date }) {
  return datetime({ date }).toJSDate()
}

function setDate ({ date, days }) {
  return datetime({ date }).plus({ days: parseInt(days) }).toJSDate()
}
