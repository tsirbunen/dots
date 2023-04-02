import { Box, Center, Flex, Input, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from '../../../hooks/use-translation'
import { POLL_CODE_LENGTH } from '../../../utils/constant-values'
import { MenuRouteTarget } from '../../layout/navigation-targets'
import SmallButton from '../../widgets/small-button/small-button'
import { Styles } from './styles'

export const DATA_CY_GIVE_VOTE_CODE = 'give_vote_code'

/**
 * This page handles asking the user for the poll code so that poll data
 * can be fetched from server and user can vote in the poll.
 */
const EnterPollCode = () => {
  const { translate } = useTranslation()
  const router = useRouter()
  const [code, setCode] = useState<string | undefined>(undefined)

  const goToVoting = () => {
    if (code) {
      router.push(`/${MenuRouteTarget.VOTE}/${code}`)
    }
  }

  const codeIsValid = () => {
    return (code ?? '').replace(' ', '').length === POLL_CODE_LENGTH
  }

  return (
    <Flex {...Styles.wrapper}>
      <Center>
        <Text {...Styles.instruction}>{translate('enter_poll_code')}</Text>
      </Center>
      <Center>
        <Input {...Styles.input} onChange={(event) => setCode(event.target.value)} />
      </Center>
      {codeIsValid() && (
        <Center>
          <Box {...Styles.buttonBox}>
            <SmallButton
              text={translate('go_to_poll').toUpperCase()}
              type="button"
              dataCy={DATA_CY_GIVE_VOTE_CODE}
              onClick={goToVoting}
            />
          </Box>
        </Center>
      )}
    </Flex>
  )
}

export default EnterPollCode
