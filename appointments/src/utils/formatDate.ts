export function formatDate(date: Date | string) {
  const unformatDate = new Date(date)

  return unformatDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
