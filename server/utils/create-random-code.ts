const CODE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'

export function createRandomCode(codeLength: number): string {
  const charactersCount = CODE_CHARACTERS.length
  let randomCode = ''
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * charactersCount)
    randomCode += CODE_CHARACTERS[randomIndex]
  }
  return randomCode
}
