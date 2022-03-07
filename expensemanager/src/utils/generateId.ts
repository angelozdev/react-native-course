export function generateId() {
  const id = (Date.now() + Math.random()).toString(36).replace('.', '')
  return id
}
