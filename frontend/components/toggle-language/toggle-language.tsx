import React, { useContext } from 'react'
import { Box, Button, Center, IconButton, Popover, PopoverContent, PopoverTrigger, Portal } from '@chakra-ui/react'
import { MdLanguage } from 'react-icons/md'
import {
  iconButtonStyle,
  popoverContentStyle,
  customButtonBoxStyle,
  iconStyle,
  buttonInvertedStyles,
  buttonStyles
} from './styles'
import { Language, useTranslation } from '../../hooks/use-translation'
import { AppStateContext, AppState } from '../../state/state-context'
import { AppStateAction, AppStateActionEnum } from '../../state/reducer'

import { Phrase } from '../../localization/translations'

export const DATA_CY_LANGUAGE_TOGGLE = 'language-toggle-icon-button'
export const DATA_CY_LANGUAGE = 'language'

const ToggleLanguage = ({ isLaunchPage }: { isLaunchPage: boolean }) => {
  const { translate } = useTranslation()
  const { state, dispatch } = useContext(AppStateContext) as {
    state: AppState
    dispatch: React.Dispatch<AppStateAction>
  }

  const changeAppLanguage = (selectedNewLanguage: Language) => {
    if (state.language !== selectedNewLanguage) {
      dispatch({ type: AppStateActionEnum.SET_LANGUAGE, data: selectedNewLanguage })
    }
  }

  const languages = Object.values(Language)

  return (
    <div>
      <Popover trigger="hover">
        <PopoverTrigger>
          <IconButton
            {...iconButtonStyle}
            isRound
            aria-label="Set app language"
            icon={<MdLanguage {...iconStyle} />}
            data-cy={DATA_CY_LANGUAGE_TOGGLE}
          />
        </PopoverTrigger>

        <Portal>
          <PopoverContent {...popoverContentStyle}>
            <Center flexDirection={isLaunchPage ? 'row' : 'column'}>
              {languages.map((language) => {
                const styles = language === state.language ? buttonStyles : buttonInvertedStyles
                return (
                  <Box key={language} {...customButtonBoxStyle}>
                    <Button
                      variant="solid"
                      {...styles}
                      size="sm"
                      data-cy={`${DATA_CY_LANGUAGE}-${language}`}
                      onClick={() => changeAppLanguage(language)}
                    >
                      {translate(`language_${language}` as Phrase)}
                    </Button>
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
