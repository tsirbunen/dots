import { Box, Center, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useContext } from 'react'
import { useBrowserStorageService } from '../../hooks/use-browser-storage-service'
import { useTranslation } from '../../hooks/use-translation'
import { StateActionType } from '../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../state/state-context'
import { TEXT_PACKAGES } from '../../utils/constant-values'
import { TextDateTimeDataHolder } from '../form-components/create-poll-form/text-date-time-data-holder'
import InputModal from '../widgets/input-modal/input-modal'
import SmallButton from '../widgets/small-button/small-button'
import { Styles } from './styles'

export const DATA_CY_ASK_FOR_NAME = 'ask_for_name'

type AskForUserNameProps = {
  askForName: boolean
}

export const AskForUserName = ({ askForName }: AskForUserNameProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { translate } = useTranslation()
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const { storeUserName } = useBrowserStorageService()

  const saveName = (newValue: string | TextDateTimeDataHolder) => {
    if (typeof newValue !== 'string') return
    dispatch({ type: StateActionType.SET_USER_NAME, data: newValue })
    storeUserName(newValue)
    onClose()
  }

  if (!askForName) return <Flex></Flex>

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
                onlyTextInput={true}
                saveData={saveName}
                originalText={''}
                textPackage={TEXT_PACKAGES.ownerName}
              />
              <Center>
                <Box {...Styles.buttonBox}>
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
