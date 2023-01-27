import type { NextPage } from 'next'
import LayoutWithHeader from '../../components/layout-with-header/layout-with-header'
import DashboardContent from '../../components/dashboard/dashboard'

const DashboardPage: NextPage = () => {
  return (
    <LayoutWithHeader>
      <DashboardContent />
    </LayoutWithHeader>
  )
}

export default DashboardPage
