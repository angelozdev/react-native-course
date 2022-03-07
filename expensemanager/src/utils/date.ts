export function timestampToDate(timestamp: number): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
    weekday: 'long'
  }
  return new Date(timestamp).toLocaleDateString('es-ES', options)
}
