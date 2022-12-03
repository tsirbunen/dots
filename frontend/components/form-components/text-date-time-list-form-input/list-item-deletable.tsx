import { DeleteIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import {
  deletableListItemContainerStyle,
  deletableListItemIconStyle,
  deletableListItemTextStyle,
  listItemDeletableStyle
} from '../../widgets/input-modal/styles'
import { TextDateTimeDataHolder } from '../../forms/data-models/text-date-time-data-holder'

export const DATA_CY_LIST_ITEM_DELETABLE = 'list_item_deletable'

type ListItemDeletableProps = {
  item: TextDateTimeDataHolder
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
        {`${item.data}`}
      </Text>
    </Flex>
  )
}

export default ListItemDeletable
