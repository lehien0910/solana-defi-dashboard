import BigNumber from 'bignumber.js'

export const formatNumber = (num: number, precision: number) => {
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