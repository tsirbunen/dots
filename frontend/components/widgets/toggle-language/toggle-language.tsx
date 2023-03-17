import React, { useContext } from 'react'
import { Box, Center, IconButton, Popover, PopoverContent, PopoverTrigger, Portal } from '@chakra-ui/react'
import { MdLanguage } from 'react-icons/md'
import { Language, useTranslation } from '../../../hooks/use-translation'
import { AppStateContext, AppState } from '../../../state/state-context'
import { DispatchAction, Dispatch } from '../../../state/reducer'
import { Phrase } from '../../../localization/translations'
import { Styles } from './styles'
import SmallButton from '../small-button/small-button'
import { useBackgroundBlur } from '../../../hooks/use-background-blur'

export const DATA_CY_LANGUAGE_TOGGLE = 'language-toggle-icon-button'
export const DATA_CY_LANGUAGE = 'language'

const ToggleLanguage = ({ isRowMode }: { isRowMode: boolean }) => {
  const { translate } = useTranslation()
  const { addBlur, removeBlur } = useBackgroundBlur()
  const { state, dispatch } = useContext(AppStateContext) as {
    state: AppState
    dispatch: React.Dispatch<DispatchAction>
  }

  const changeAppLanguage = (selectedNewLanguage: Language) => {
    if (state.language !== selectedNewLanguage) {
      dispatch({ type: Dispatch.SET_LANGUAGE, data: selectedNewLanguage })
    }
  }

  const languages = Object.values(Language)

  return (
    <div>
      <Popover trigger="hover" onOpen={!isRowMode ? addBlur : undefined} onClose={!isRowMode ? removeBlur : undefined}>
        <PopoverTrigger>
          <IconButton
            {...Styles.iconButton}
            isRound
            aria-label={DATA_CY_LANGUAGE_TOGGLE}
            icon={<MdLanguage {...Styles.icon} />}
            data-cy={DATA_CY_LANGUAGE_TOGGLE}
          />
        </PopoverTrigger>

        <Portal>
          <PopoverContent {...Styles.popoverContent}>
            <Center {...Styles.container(isRowMode)}>
              {languages.map((language) => {
                return (
                  <Box key={language} {...Styles.buttonContainer}>
                    <SmallButton
                      dataCy={`${DATA_CY_LANGUAGE}-${language}`}
                      text={translate(`language_${language}` as Phrase)}
                      onClick={() => changeAppLanguage(language)}
                      noMargin={true}
                    />
                  </Box>
                )
              })}
            </Center>
          </PopoverContent>
        </Portal>
      </Popover>
    </div>
  )
}

export default ToggleLanguage
