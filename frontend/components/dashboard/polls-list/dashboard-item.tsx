import { Flex, Box, Center, Text, IconButton } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Poll } from '../../../types/types'
import { Styles } from './styles'
import { useRouter } from 'next/router'
import { CreatedInfo } from './created-info'
import { PollDataTable } from './poll-data-table'

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

  return (
    <Flex {...Styles.column}>
      <Flex {...Styles.listItemContainer} onClick={handleNavigateToPollPage}>
        <Center data-cy={DATA_CY_DASHBOARD_LIST_ITEM} {...Styles.listItemCard}>
          <Flex {...Styles.textContainer}>
            <CreatedInfo createdAt={poll.createdAt} pollState={poll.state} />
            <Text {...Styles.title}>{poll.question}</Text>
            <PollDataTable pollCode={poll.code} pollOptions={poll.options} />
          </Flex>
        </Center>
        <Box {...Styles.nextIconContainer}>
          <IconButton
            aria-label={'next-actions'}
            {...Styles.nextIcon}
            icon={<ChevronRightIcon {...Styles.chakraIconStyle} />}
            data-cy={`${DATA_CY_DASHBOARD_ACTION_BUTTON}-next-actions`}
          />
        </Box>
      </Flex>
    </Flex>
  )
}

export default DashboardItem
