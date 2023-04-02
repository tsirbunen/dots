import React from 'react'
import { Button } from '@chakra-ui/react'
import { Styles } from './styles'

type SmallButtonProps = {
  text: string
  onClick?: () => void
  dataCy: string
  type?: 'button' | 'submit' | 'reset' | undefined
  isLarger?: boolean
  isDisabled?: boolean
  noMargin?: boolean
  isInverted?: boolean
}

const SmallButton = ({
  text,
  onClick,
  dataCy,
  type,
  isLarger,
  isDisabled = false,
  noMargin = false,
  isInverted = false
}: SmallButtonProps) => {
  const sizeStyle = isLarger ? { size: 'lg', paddingLeft: '20px', paddingRight: '20px' } : { size: 'sm' }
  return (
    <Button
      {...Styles.smallButton(noMargin, isInverted)}
      {...sizeStyle}
      data-cy={dataCy}
      onClick={onClick}
      type={type}
      isDisabled={isDisabled}
    >
      {text}
    </Button>
  )
}

export default SmallButton
