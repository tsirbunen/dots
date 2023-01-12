import { Flex, Box, Center, Text, IconButton } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, UnlockIcon, LockIcon, ViewIcon } from '@chakra-ui/icons'
import { Poll } from '../../types/types'
import {
  chakraIconStyle,
  iconButtonStyle,
  listItemContainer,
  materialsIconStyle,
  textContainer,
  titleStyle
} from './styles'
import { PollState } from '../../types/graphql-schema-types.generated'

import { MdOutlineHowToVote } from 'react-icons/md'

export const DATA_CY_DASHBOARD_LIST_ITEM = 'dashboard_list_item'
export const DATA_CY_DASHBOARD_ACTION_BUTTON = 'dashboard_action_button'

type DashboardListItemProps = {
  poll: Poll
}

type DashboardActionButtonProps = {
  actionType: 'delete' | 'vote' | 'edit' | 'view'
  action: () => void
}

const DashboardActionButton = ({ actionType, action }: DashboardActionButtonProps) => {
  const getIcon = () => {
    switch (actionType) {
      case 'delete':
        return <DeleteIcon {...chakraIconStyle} />
      case 'vote':
        return <MdOutlineHowToVote {...materialsIconStyle} />
      case 'edit':
        return <EditIcon {...chakraIconStyle} />
      case 'view':
        return <ViewIcon {...chakraIconStyle} />
      default:
        throw new Error(`Action icon not implemented for ${actionType}`)
    }
  }

  return (
    <Box style={{ marginLeft: '5px' }}>
      <IconButton
        aria-label={actionType}
        {...iconButtonStyle}
        icon={getIcon()}
        onClick={action}
        data-cy={`${DATA_CY_DASHBOARD_ACTION_BUTTON}-${actionType}`}
      />
    </Box>
  )
}

const DashboardListItem = ({ poll }: DashboardListItemProps) => {
  return (
    <Center data-cy={DATA_CY_DASHBOARD_LIST_ITEM} {...listItemContainer}>
      <Flex {...textContainer}>
        <Text {...titleStyle}>{poll.question}</Text>
        <Text {...titleStyle}>{poll.code}</Text>
      </Flex>
      <Flex style={{ flexDirection: 'row' }}>
        <DashboardActionButton actionType="view" action={() => console.log('vote')} />
        {poll.state === PollState.Vote && (
          <DashboardActionButton actionType="vote" action={() => console.log('vote')} />
        )}
        <DashboardActionButton actionType="delete" action={() => console.log('delete')} />
      </Flex>
    </Center>
  )
}

export default DashboardListItem
