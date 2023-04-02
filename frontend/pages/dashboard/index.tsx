import type { NextPage } from 'next'
import LayoutWithHeader from '../../components/layout/layout-with-header'
import { PollsList } from '../../components/dashboard/polls-list/polls-list'

export const DATA_CY_DASHBOARD_PAGE = 'dashboard_page'
/**
 * On dashboard page a user can view all of the polls the user has created
 * (and manage those polls) and also those polls by others for which the user
 * has given the poll code.
 */
const DashboardPage: NextPage = () => {
  return (
    <LayoutWithHeader dataCy={DATA_CY_DASHBOARD_PAGE}>
      <PollsList />
    </LayoutWithHeader>
  )
}

export default DashboardPage
