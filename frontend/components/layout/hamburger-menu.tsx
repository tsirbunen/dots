import { Popover, PopoverTrigger, IconButton, Portal, PopoverContent, Center, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from '../../hooks/use-translation'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Styles } from './styles'
import SmallButton from '../widgets/small-button/small-button'
import { MenuRouteTarget, navigationTargets } from './navigation-targets'
import { useBackgroundBlur } from '../../hooks/use-background-blur'

export const DATA_CY_ROUTE_BUTTON = 'route-button'
export const DATA_CY_MENU_BUTTON = 'menu-button'

const HamburgerMenu = () => {
  const router = useRouter()
  const { translate } = useTranslation()
  const { addBlur, removeBlur } = useBackgroundBlur()

  const navigateToRoute = (routeTarget: MenuRouteTarget) => {
    router.push(`/${routeTarget}`)
  }

  return (
    <Popover trigger="hover" onOpen={addBlur} onClose={removeBlur}>
      <PopoverTrigger>
        <IconButton
          {...Styles.iconButton}
          aria-label="Select route"
          data-cy={DATA_CY_MENU_BUTTON}
          icon={<HamburgerIcon {...Styles.icon} />}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent {...Styles.popover}>
          <Center {...Styles.hamburgerMenu}>
            {navigationTargets.map((target) => {
              return (
                <Flex key={target.label} {...Styles.buttonContainer}>
                  <SmallButton
                    dataCyPostfix={`${DATA_CY_ROUTE_BUTTON}-${target.route}`}
                    text={translate(target.label)}
                    onClick={() => {
                      removeBlur()
                      navigateToRoute(target.route)
                    }}
                    noMargin={true}
                  />
                </Flex>
              )
            })}
          </Center>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default HamburgerMenu
