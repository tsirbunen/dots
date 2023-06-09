import { Center, Text, Flex, Box } from '@chakra-ui/react'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import LayoutWithHeader from '../../layout/layout-with-header'
import { Styles } from './styles'

export const DATA_CY_NOT_FOUND = 'not_found'

type NotFoundProps = {
  textLines: string[]
  withLayout?: boolean
}

const NotFound = ({ textLines, withLayout }: NotFoundProps) => {
  const getNotFound = () => (
    <Center data-cy={DATA_CY_NOT_FOUND}>
      <Flex {...Styles.container}>
        <Box {...Styles.emojiBox}>
          <HiOutlineEmojiSad {...Styles.emoji} />
        </Box>
        <Text {...Styles.oops}>OOPS...</Text>
        {textLines.map((line) => {
          return (
            <Text key={line} {...Styles.textLine}>
              {line}
            </Text>
          )
        })}
      </Flex>
    </Center>
  )

  if (!withLayout) {
    return <Center data-cy={DATA_CY_NOT_FOUND}>{getNotFound()}</Center>
  }

  return (
    <LayoutWithHeader dataCy={DATA_CY_NOT_FOUND}>
      <Center>{getNotFound()}</Center>
    </LayoutWithHeader>
  )
}

export default NotFound
