const MAX_NUMBER_AVAILABLE = 999_999_999_999

export function numberToCurrency(value?: number | string): string {
  if (!value) return ''
  if (isNaN(+value)) {
    console.error('numberToCurrency: value is not a number')
    return ''
  }

  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })
}

export function currencyToNumber(value?: string): number {
  if (!value) return 0
  const number = Number(value.replace(/[^0-9]+/g, ''))

  if (isNaN(number)) {
    console.error('currencyToNumber: value is not a number')
    return Number.NaN
  }

  if (number >= MAX_NUMBER_AVAILABLE) return MAX_NUMBER_AVAILABLE

  return number
}
