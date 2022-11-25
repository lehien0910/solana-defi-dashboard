import BigNumber from 'bignumber.js'
import { format, addMinutes } from 'date-fns'

export const formatNumber = (num: number, precision?: number) => {
  if (!num) return num

  if (!precision) {
    switch (true) {
      case Math.abs(num) < 1:
        precision = 8
        break

      case Math.abs(num) < 10:
        precision = 4
        break

      case Math.abs(num) >= 10:
        precision = 2
        break
    }
  }

  let formated = BigNumber(num).toFormat(precision)

  if (formated.match(/\.[0]+$/g)) {
    formated = formated.replace(/\.[0]+$/g, '')
  }

  if (formated.match(/\.\d+[0]+$/g)) {
    formated = formated.replace(/[0]+$/g, '')
  }

  return formated
}

export function formatTimestamp(timestamp: number, pattern = "MM/dd") {
  if (!timestamp) return null

  const dateLocal = new Date(timestamp * 1000)
  return format(addMinutes(dateLocal, dateLocal.getTimezoneOffset()), pattern)
}

export const abbrNumber = (num: number) => {
  if (!num) return num

  switch (true) {
    case Math.abs(num) >= 1000000000:
      return formatNumber((num/1000000000), 2)?.toString() + 'B'
    
    case Math.abs(num) >= 1000000:
      return formatNumber((num/1000000), 2)?.toString() + 'M'

    case Math.abs(num) >= 1000:
      return formatNumber((num/1000), 2)?.toString() + 'K'

    default:
      return formatNumber(num, 2)?.toString()
  }
}

export const getPlatformName = (value: string | undefined) => {

  switch (value) {
    case 'whirlpool':
      return 'Orca'
  
    case 'orca':
      return 'Orca Legacy'

    default:
      return value
  }
}