import { DeleteIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import {
  deletableListItemContainerStyle,
  deletableListItemIconStyle,
  deletableListItemTextStyle,
  listItemDeletableStyle
} from '../../widgets/input-modal/styles'

export const DATA_CY_LIST_ITEM_DELETABLE = 'list_item_deletable'

type ListItemDeletableProps = {
  item: string
  index: number
  deleteItem: () => void
}

const ListItemDeletable = ({ item, index, deleteItem }: ListItemDeletableProps) => {
  return (
    <Flex {...deletableListItemContainerStyle}>
      <IconButton
        aria-label={`${DATA_CY_LIST_ITEM_DELETABLE}`}
        {...listItemDeletableStyle}
        icon={<DeleteIcon {...deletableListItemIconStyle} />}
        onClick={() => deleteItem()}
      />
      <Text data-cy={`${DATA_CY_LIST_ITEM_DELETABLE}-${index}`} {...deletableListItemTextStyle}>
        {item}
      </Text>
    </Flex>
  )
}

export default ListItemDeletable
