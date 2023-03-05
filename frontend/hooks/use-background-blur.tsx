const NEXT_ROOT_ID = '__next'

type UseBackgroundBlur = {
  addBlur: () => void
  removeBlur: () => void
}

export const useBackgroundBlur = (): UseBackgroundBlur => {
  const addBlur = () => {
    const element = document.getElementById(NEXT_ROOT_ID)
    if (element) {
      element.style.filter = 'blur(8px)'
    }
  }

  const removeBlur = () => {
    const element = document.getElementById(NEXT_ROOT_ID)
    if (element) {
      element.style.filter = 'blur(0px)'
    }
  }
  return {
    addBlur,
    removeBlur
  }
}
