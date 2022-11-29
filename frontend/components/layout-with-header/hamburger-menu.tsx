import { Popover, PopoverTrigger, IconButton, Portal, PopoverContent, Center, Flex, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from '../../hooks/use-translation'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  iconStyle,
  popoverContentStyle,
  buttonStyles,
  buttonInvertedStyles,
  customButtonBoxStyle,
  iconButtonStyle
} from '../../common/common-styles'

export const DATA_CY_ROUTE_BUTTON = 'route-button'
export const DATA_CY_MENU_BUTTON = 'menu-button'

enum MenuRouteTarget {
  LAUNCH_PAGE = '',
  CREATE_POLL = 'create-poll',
  VOTE_IN_POLL = 'vote-in-poll',
  VIEW_POLL = 'view-poll'
}

const HamburgerMenu = () => {
  const router = useRouter()
  const { translate } = useTranslation()

  const currentPathname = router.pathname

  const navigateToRoute = (routeTarget: MenuRouteTarget) => {
    router.push(`/${routeTarget}`)
  }

  const navigationTargets = [
    {
      label: translate('navigation_route_launch_page'),
      route: MenuRouteTarget.LAUNCH_PAGE
    },
    {
      label: translate('navigation_route_create_poll'),
      route: MenuRouteTarget.CREATE_POLL
    },
    {
      label: translate('navigation_route_vote_in_poll'),
      route: MenuRouteTarget.VOTE_IN_POLL
    },
    {
      label: translate('navigation_route_view_poll'),
      route: MenuRouteTarget.VIEW_POLL
    }
  ]

  return (
    <Popover
      trigger="hover"
      onOpen={() => console.log('TODO: Add blur background effect here')}
      onClose={() => console.log('TODO: Remove blur background effect here')}
    >
      <PopoverTrigger>
        <IconButton
          {...iconButtonStyle}
          aria-label="Select route"
          data-cy={DATA_CY_MENU_BUTTON}
          icon={<HamburgerIcon {...iconStyle} />}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent {...popoverContentStyle}>
          <Center flexDirection="column" alignItems="flex-start" marginLeft="15px">
            {navigationTargets.map((target) => {
              const isSelected = target.route === currentPathname
              const styles = isSelected ? buttonStyles : buttonInvertedStyles
              return (
                <Flex key={target.label} {...customButtonBoxStyle}>
                  <Button
                    variant="solid"
                    onClick={() => navigateToRoute(target.route)}
                    {...styles}
                    data-cy={`${DATA_CY_ROUTE_BUTTON}-${target.route}`}
                  >
                    {target.label}
                  </Button>
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
