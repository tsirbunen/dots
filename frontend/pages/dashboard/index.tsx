import type { NextPage } from 'next'
import LayoutWithHeader from '../../components/layout-with-header/layout-with-header'
import DashboardContent from '../../components/dashboard-content/dashboard-content'

export const DATA_CY_DASHBOARD_PAGE = 'dashboard_page'

const DashboardPage: NextPage = () => {
  return (
    <LayoutWithHeader>
      <div data-cy={DATA_CY_DASHBOARD_PAGE}>
        <DashboardContent />
      </div>
    </LayoutWithHeader>
  )
}

export default DashboardPage
