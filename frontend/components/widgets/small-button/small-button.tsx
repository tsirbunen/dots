import React from 'react'
import { Button } from '@chakra-ui/react'
import { smallButtonStyles } from './styles'

export const DATA_CY_SMALL_BUTTON = 'small-button'
type SmallButtonProps = {
  text: string
  onClick?: () => void
  dataCyPostfix: string
  type?: 'button' | 'submit' | 'reset' | undefined
  isLarger?: boolean
  isDisabled?: boolean
}

const SmallButton = ({ text, onClick, dataCyPostfix, type, isLarger, isDisabled = false }: SmallButtonProps) => {
  const sizeStyle = isLarger ? { size: 'lg', paddingLeft: '20px', paddingRight: '20px' } : { size: 'sm' }
  return (
    <Button
      {...smallButtonStyles}
      {...sizeStyle}
      data-cy={`${DATA_CY_SMALL_BUTTON}-${dataCyPostfix}`}
      onClick={onClick}
      type={type}
      isDisabled={isDisabled}
    >
      {text}
    </Button>
  )
}

export default SmallButton