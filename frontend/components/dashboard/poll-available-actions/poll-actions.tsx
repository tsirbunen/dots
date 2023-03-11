import { Box, Flex } from '@chakra-ui/react'
import { Styles } from './styles'
import SmallButton from '../../widgets/small-button/small-button'
import { useTranslation } from '../../../hooks/use-translation'
import { ActionButtonData } from '../../../pages/dashboard/[code]'

type PollActionsProps = {
  availableActions: ActionButtonData[]
}

export const PollActions = ({ availableActions }: PollActionsProps) => {
  const { translate } = useTranslation()

  return (
    <Flex {...Styles.container}>
      {availableActions.map((action) => {
        return (
          <Box key={`text-${action.phrase}`} {...Styles.buttonBox}>
            <SmallButton
              text={translate(action.phrase).toUpperCase()}
              type="button"
              dataCyPostfix={action.cy}
              onClick={action.onClick}
            />
          </Box>
        )
      })}
    </Flex>
  )
}
