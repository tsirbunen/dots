import { Phrase } from '../../localization/translations'

export enum MenuRouteTarget {
  LAUNCH_PAGE = '',
  CREATE_POLL = 'create-poll',
  VOTE = 'vote',
  DASHBOARD = 'dashboard'
}

export type NavigationTarget = { label: Phrase; route: MenuRouteTarget }

export const navigationTargets: NavigationTarget[] = [
  {
    label: 'navigation_route_launch_page',
    route: MenuRouteTarget.LAUNCH_PAGE
  },
  {
    label: 'navigation_route_create_poll',
    route: MenuRouteTarget.CREATE_POLL
  },
  {
    label: 'navigation_route_vote',
    route: MenuRouteTarget.VOTE
  },
  {
    label: 'navigation_route_dashboard',
    route: MenuRouteTarget.DASHBOARD
  }
]
