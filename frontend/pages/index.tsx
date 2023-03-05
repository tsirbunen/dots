import type { NextPage } from 'next'
import LaunchPageContent from '../components/launch/launch-page-content'

/**
 * This is the very first page the user is shown when the app launches.
 */
const IndexPage: NextPage = () => {
  return <LaunchPageContent />
}

export default IndexPage
