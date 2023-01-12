import type { NextPage } from 'next'
import LayoutWithHeader from '../../components/layout-with-header/layout-with-header'
import DashboardContent from '../../components/dashboard-content/dashboard-content'

const DashboardPage: NextPage = () => {
  return (
    <LayoutWithHeader>
      <div>
        <DashboardContent />
      </div>
    </LayoutWithHeader>
  )
}

export default DashboardPage
