export function generateId(): string {
  const timestamp = Date.now()
  const randomNumber = (timestamp + Math.random()).toString(36)
  const id = randomNumber.replace('.', '')
  return id
}
