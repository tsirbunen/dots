import { useEffect, useCallback, useContext } from 'react'
import { useBrowserStorageService } from '../../hooks/use-browser-storage-service'
import { AppStateActionEnum } from '../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../state/state-context'
import { Poll } from '../../types/types'

import { validatePollsData } from '../../utils/validations'
import { useGraphQLClientService } from './use-graphql-client-service'

export const DATA_CY_DASHBOARD_CONTENT = 'dashboard_content'

const DashboardContent = () => {
  const { findPollsByCode } = useGraphQLClientService()
  const { getPollCodes, getToken } = useBrowserStorageService()
  const { dispatch } = useContext(AppStateContext) as AppStateContextType

  const fetchPolls = useCallback(async () => {
    const codes = getPollCodes()
    const token = getToken()
    if (codes.length > 0 && token) {
      const allPolls = await findPollsByCode(codes, token)
      const validatedPolls = validatePollsData(allPolls)

      const pollsDictionary: Record<string, Poll> = {}
      validatedPolls.forEach((poll) => {
        pollsDictionary[poll.code] = poll
      })
      dispatch({ type: AppStateActionEnum.SET_ALL_POLLS, data: pollsDictionary })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (window) {
      fetchPolls()
    }
  }, [fetchPolls])

  return <div data-cy={DATA_CY_DASHBOARD_CONTENT}></div>
}

export default DashboardContent
