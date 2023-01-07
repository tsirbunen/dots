import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import EditPollFormWrapper from '../../components/form-components/create-poll-form/edit-poll-form-wrapper'
import LayoutWithHeader from '../../components/layout-with-header/layout-with-header'
import { AppStateAction } from '../../state/reducer'
import { AppStateContext, AppState } from '../../state/state-context'
// import { usePollsData } from '../../hooks/use-polls-data'
import { Poll } from '../../types/types'

export const DATA_CY_MY_POLLS_EDIT_PAGE = 'my_polls_edit_page'

const MyPollPage: NextPage = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(AppStateContext) as {
    state: AppState
    dispatch: React.Dispatch<AppStateAction>
  }
  const [poll, setPoll] = useState<Poll | undefined>(undefined)
  // const { getPollByCode } = usePollsData()
  const { code } = router.query

  // const retrievePoll = useCallback(async () => {
  //   // const retrievedPoll = await getPollByCode(code as string)

  //   if (retrievedPoll) setPoll(retrievedPoll)
  // }, [code, getPollByCode])

  // useEffect(() => {
  //   if (window && typeof code === 'string') {
  //     retrievePoll()
  //   }
  // }, [code, retrievePoll])

  return (
    <LayoutWithHeader>
      <div data-cy={DATA_CY_MY_POLLS_EDIT_PAGE}>{poll && <EditPollFormWrapper poll={poll} />}</div>
    </LayoutWithHeader>
  )
}

export default MyPollPage
