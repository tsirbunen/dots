import { Flex, Text } from '@chakra-ui/react'
import { EditIcon, UnlockIcon, LockIcon } from '@chakra-ui/icons'
import { Styles } from './styles'
import { PollState } from '../../../types/graphql-schema-types.generated'
import { asDDMMYYYY } from '../../../utils/date-time-utils'
import { ThemeColorCodes } from '../../../theme/theme'

type CreatedInfoProps = {
  createdAt: Date
  pollState: PollState
}

export const CreatedInfo = ({ createdAt, pollState }: CreatedInfoProps) => {
  const createdAtFormatted = asDDMMYYYY(createdAt)

  const getIconShowingPollState = () => {
    switch (pollState) {
      case PollState.Edit:
        return <EditIcon color={ThemeColorCodes.BACKGROUND} />
      case PollState.Vote:
        return <UnlockIcon color={ThemeColorCodes.BACKGROUND} />
      case PollState.Closed:
        return <LockIcon color={ThemeColorCodes.BACKGROUND} />
      default:
        throw new Error(`No such poll state as ${pollState}`)
    }
  }

  return (
    <Flex {...Styles.createdContainer}>
      {getIconShowingPollState()}
      <Text {...Styles.date}>{`Created ${createdAtFormatted}`}</Text>
    </Flex>
  )
}
