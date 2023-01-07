import React from 'react'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import {
  outerContainer,
  innerContainer,
  toastTitleStyle,
  messageText,
  iconButtonStyle,
  iconStyle,
  iconButtonIconStyle,
  headerContainer,
  messageContainer
} from './styles'
import { CheckCircleIcon, InfoIcon } from '@chakra-ui/icons'
import { ThemeColorCodes } from '../../../theme/theme'
import { CloseIcon } from '@chakra-ui/icons'
import { WarningTwoIcon } from '@chakra-ui/icons'

import { useTranslation } from '../../../hooks/use-translation'
import { Phrase } from '../../../localization/translations'

export const DATA_CY_TOAST_TITLE = 'toast_title'
export const DATA_CY_TOAST_CLOSE = 'toast_close'
export const DATA_CY_TOAST_MESSAGE = 'toast_message'

export enum ToastType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}

type ToastProps = {
  title?: string
  message: string
  type: ToastType
  toastId: string
  closeToast: () => void
}

const getToastIcon = (type: ToastType, contentColor: { color?: ThemeColorCodes }) => {
  switch (type) {
    case ToastType.SUCCESS:
      return <CheckCircleIcon {...iconStyle} />
    case ToastType.ERROR:
      return <WarningTwoIcon {...contentColor} {...iconStyle} />
    case ToastType.WARNING:
      return <InfoIcon {...iconStyle} />
    default:
      throw new Error(`Toast icon for type ${type} not implemented!`)
  }
}

const getContentColor = (type: ToastType) => {
  return type === ToastType.ERROR ? { color: ThemeColorCodes.CONTRAST } : {}
}

const getToastDefaultTitle = (type: ToastType, translate: (phrase: Phrase) => string): string => {
  switch (type) {
    case ToastType.SUCCESS:
      return translate('toast_default_success')
    case ToastType.ERROR:
      return translate('toast_default_error')
    case ToastType.WARNING:
      return translate('toast_default_warning')
    default:
      throw new Error(`Toast title for type ${type} not implemented!`)
  }
}

const Toast = ({ title, message, type, closeToast }: ToastProps): JSX.Element | null => {
  const { translate } = useTranslation()
  const contentColor = getContentColor(type)

  return (
    <Box {...outerContainer(type)}>
      <Flex {...innerContainer}>
        <Flex {...headerContainer}>
          <Box>{getToastIcon(type, contentColor)}</Box>
          <Text {...contentColor} {...toastTitleStyle} data-cy={DATA_CY_TOAST_TITLE}>
            {title ?? getToastDefaultTitle(type, translate)}
          </Text>
          <IconButton
            {...iconButtonStyle}
            isRound
            aria-label={DATA_CY_TOAST_CLOSE}
            icon={<CloseIcon {...iconButtonIconStyle} {...contentColor} />}
            onClick={closeToast}
            data-cy={DATA_CY_TOAST_CLOSE}
          />
        </Flex>
        <Flex {...messageContainer}>
          <Text {...contentColor} {...messageText} data-cy={DATA_CY_TOAST_MESSAGE}>
            {message}
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Toast
