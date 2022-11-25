import React from 'react'
import { Button } from '@chakra-ui/react'
import { simpleButtonStyles } from './styles'

type SmallButtonProps = {
  text: string
  onClick: () => void
}

const SimpleButton = ({ text, onClick }: SmallButtonProps) => {
  return (
    <Button variant="solid" {...simpleButtonStyles} data-cy={`small-button-${text}`} onClick={onClick}>
      {text}
    </Button>
  )
}

export default SimpleButton
