import { Box, Center, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useContext } from 'react'
import { useBrowserStorage } from '../../../hooks/use-browser-storage'
import { useTranslation } from '../../../hooks/use-translation'
import { StateActionType } from '../../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../../state/state-context'
import { PACKAGES } from '../../../utils/constant-values'

import InputModal from '../../forms/form-inputs/input-modal'
import SmallButton from '../../widgets/small-button/small-button'
import { Styles } from './styles'

export const DATA_CY_ASK_FOR_NAME = 'ask_for_name'

export const AskForUserName = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { translate } = useTranslation()
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const { storeUserName } = useBrowserStorage()

  const saveName = (newValue: string) => {
    if (typeof newValue !== 'string') return
    dispatch({ type: StateActionType.SET_USER_NAME, data: newValue })
    storeUserName(newValue)
    onClose()
  }

  return (
    <Center data-cy={DATA_CY_ASK_FOR_NAME}>
      <Flex>
        <Center>
          <Flex style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text {...Styles.info}>{translate('not_anonymous_info_1')}</Text>
            <Text {...Styles.info}>{translate('not_anonymous_info_2')}</Text>
            <Text {...Styles.info}>{translate('not_anonymous_info_3')}</Text>

            <Box {...Styles.setNameBox}>
              <InputModal
                isOpen={isOpen}
                onClose={onClose}
                saveData={saveName}
                originalText={''}
                textPackage={PACKAGES.ownerName}
              />
              <Center>
                <Box>
                  <SmallButton
                    text={translate('enter_name').toUpperCase()}
                    type="button"
                    dataCyPostfix={DATA_CY_ASK_FOR_NAME}
                    onClick={onOpen}
                  />
                </Box>
              </Center>
            </Box>
          </Flex>
        </Center>
      </Flex>
    </Center>
  )
}
