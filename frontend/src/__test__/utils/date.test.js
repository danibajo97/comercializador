/* global describe it expect */
import '@testing-library/jest-dom'
import date from 'utils/date'

describe('Utils Date ', () => {
  it('Probar el metodo de toISODate', () => {
    const dateSTR = '2022-12-30T10:20:30'
    const datePlus0 = date.toISODate({ date: dateSTR, days: 0 })
    const datePlus5 = date.toISODate({ date: dateSTR, days: 5 })

    expect(datePlus0).toEqual('2022-12-30')
    expect(datePlus5).toEqual('2023-01-04')

    const dateOther = 'Fri Nov 25 2022 00:00:00 GMT-0500 (hora estándar de Cuba)'
    const dateOtherPlus0 = date.toISODate({ date: dateOther, days: 0 })

    expect(dateOtherPlus0).toEqual('2022-11-25')
  })
})
