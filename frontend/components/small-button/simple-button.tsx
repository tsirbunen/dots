import React from 'react'
import { Button } from '@chakra-ui/react'
import { simpleButtonStyles } from './styles'

export const DATA_CY_SIMPLE_BUTTON = 'simple-button'
type SmallButtonProps = {
  text: string
  onClick: () => void
  dataCyPostfix: string
}

const SimpleButton = ({ text, onClick, dataCyPostfix }: SmallButtonProps) => {
  return (
    <Button
      size="sm"
      variant="solid"
      {...simpleButtonStyles}
      data-cy={`${DATA_CY_SIMPLE_BUTTON}-${dataCyPostfix}`}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

export default SimpleButton
