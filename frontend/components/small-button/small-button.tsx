import React from 'react'
import { Button } from '@chakra-ui/react'
import { smallButtonStyles } from './styles'

export const DATA_CY_SMALL_BUTTON = 'simple-button'
type SmallButtonProps = {
  text: string
  onClick: () => void
  dataCyPostfix: string
}

const SimpleButton = ({ text, onClick, dataCyPostfix }: SmallButtonProps) => {
  return (
    <Button {...smallButtonStyles} data-cy={`${DATA_CY_SMALL_BUTTON}-${dataCyPostfix}`} onClick={onClick}>
      {text}
    </Button>
  )
}

export default SimpleButton
