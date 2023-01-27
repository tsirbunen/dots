import { Flex, Box, Center, Text, IconButton, Divider } from '@chakra-ui/react'
import { EditIcon, UnlockIcon, LockIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Poll } from '../../types/types'
import { Styles } from './styles'
import { PollState } from '../../types/graphql-schema-types.generated'
// import { MdOutlineHowToVote } from 'react-icons/md'
import { useRouter } from 'next/router'
import { asDDMMYYYY } from '../../utils/date-time-utils'
import { ThemeColorCodes } from '../../theme/theme'

export const DATA_CY_DASHBOARD_LIST_ITEM = 'dashboard_list_item'
export const DATA_CY_DASHBOARD_ACTION_BUTTON = 'dashboard_action_button'

type DashboardItemProps = {
  poll: Poll
}

const DashboardItem = ({ poll }: DashboardItemProps) => {
  const router = useRouter()
  const handleNavigateToPollPage = () => {
    router.push(`/dashboard/${poll.code}`)
  }
  const createdAt = asDDMMYYYY(poll.createdAt)

  const getStateIcon = () => {
    switch (poll.state) {
      case PollState.Edit:
        return <EditIcon color={ThemeColorCodes.SHADE_1} />
      case PollState.Vote:
        return <UnlockIcon color={ThemeColorCodes.SHADE_1} />
      case PollState.Closed:
        return <LockIcon color={ThemeColorCodes.SHADE_1} />
      default:
        throw new Error(`No such poll state as ${poll.state}`)
    }
  }

  const tableCell = (text: string, style: Record<string, string>) => {
    return (
      <td>
        <Text {...style}>{text}</Text>
      </td>
    )
  }

  return (
    <Flex {...Styles.column}>
      <Flex {...Styles.listItemContainer} onClick={handleNavigateToPollPage}>
        <Center data-cy={DATA_CY_DASHBOARD_LIST_ITEM} {...Styles.listItemCard}>
          <Flex {...Styles.textContainer}>
            <Flex {...Styles.iconDateContainer}>
              {getStateIcon()}
              <Text {...Styles.date}>{`Created ${createdAt}`}</Text>
            </Flex>
            <Text {...Styles.titleStyle}>{poll.question}</Text>

            <table>
              <tbody>
                <tr style={{ marginBottom: '5px' }}>
                  {tableCell('code', Styles.fieldName)}
                  {tableCell(poll.code, Styles.fieldValue)}
                </tr>
                {poll.options.map((option, index) => {
                  const textLeft = index === 0 ? 'options' : ' '
                  return (
                    <tr key={option.id}>
                      {tableCell(textLeft, Styles.optionFieldName)}
                      {tableCell(option.content, Styles.optionFieldValue)}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Flex>
        </Center>
        <Box style={{ marginLeft: '5px' }}>
          <IconButton
            aria-label={'delete'}
            {...Styles.nextIconButtonStyle}
            icon={<ChevronRightIcon {...Styles.chakraIconStyle} />}
            onClick={() => console.log('delete')}
            data-cy={`${DATA_CY_DASHBOARD_ACTION_BUTTON}-delete`}
          />
        </Box>
      </Flex>
      <Center>
        <Divider {...Styles.divider} />
      </Center>
    </Flex>
  )
}

export default DashboardItem
