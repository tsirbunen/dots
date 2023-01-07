import { SystemProps } from '@chakra-ui/react'
import { ThemeColorCodes } from '../../../theme/theme'
import { ToastType } from './toast'

export const outerContainer = (type: ToastType) => {
  return {
    backgroundColor: ThemeColorCodes[type],
    borderRadius: 6,
    padding: '15px',
    width: '300px'
  }
}

export const innerContainer = {
  flexDirection: 'column' as SystemProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'space-between'
}

export const headerContainer = {
  flexDirection: 'row' as SystemProps['flexDirection'],
  alignItems: 'center',
  maxWidth: '300px',
  paddingLeft: '20px',
  paddingRight: '20px'
}
export const messageContainer = {
  flexDirection: 'row' as SystemProps['flexDirection'],
  alignItems: 'center',
  maxWidth: '240px',
  marginTop: '5px'
}

export const toastTitleStyle = {
  width: '250px',
  fontWeight: 'bold',
  fontSize: '1.3em',
  align: 'center' as SystemProps['textAlign']
}

export const messageText = {
  width: '250px',
  fontSize: '1.0em',
  fontWeight: 'bold',
  align: 'center' as SystemProps['textAlign']
}

export const iconButtonStyle = {
  bg: 'transparent',
  size: 'sm'
}

export const iconStyle = {
  fontSize: '1.8em'
}

export const iconButtonIconStyle = {
  fontSize: '1.4em'
}
