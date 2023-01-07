import Toast, { ToastType } from '../components/widgets/toast/toast'
import hotToast from 'react-hot-toast'
import { useToaster } from 'react-hot-toast/headless'

export type ShowToastInput = {
  title?: string
  message: string
  type: ToastType
  toastId: string
  duration?: number
}

type UseToast = {
  showToast: (showToastInput: ShowToastInput) => void
  hideToast: (toastId: string) => void
}

export const useToast = (): UseToast => {
  const { handlers } = useToaster()
  const { endPause } = handlers

  const showToast = ({ title, message, type, toastId, duration }: ShowToastInput) => {
    const toast = (
      <Toast title={title} message={message} type={type} toastId={toastId} closeToast={() => hideToast(toastId)} />
    )
    return hotToast.custom(toast, { id: toastId, duration: duration ?? 4000 })
  }

  const hideToast = (toastId: string) => {
    hotToast.remove(toastId)
    endPause()
  }

  return {
    showToast,
    hideToast
  }
}
