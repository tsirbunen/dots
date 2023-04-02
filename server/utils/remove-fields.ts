export function removeFields<T>(target: T, fieldsToRemove: string[]): Partial<T> {
  const strippedTarget: Partial<T> = {}
  for (const key in target) {
    if (!fieldsToRemove.includes(key)) {
      strippedTarget[key] = target[key]
    }
  }
  return strippedTarget
}
