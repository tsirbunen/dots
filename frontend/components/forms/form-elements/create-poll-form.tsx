import { Box } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { Styles } from './styles'
import { useBrowserStorage } from '../../../hooks/use-browser-storage'
import { CreatePollInput, DataClass } from '../../../types/graphql-schema-types.generated'
import { useContext, useEffect } from 'react'
import { PollForm, PollFormData } from './poll-form'
import { Dispatch } from '../../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../../state/state-context'
import { useRouter } from 'next/router'
import { useGraphQLClient } from '../../../hooks/use-graphql-client'
import { FormMode } from './action-buttons'

export const DATA_CY_CREATE_POLL_FORM = 'create_poll_form'

/**
 * This component equips the common "core" poll form component with necessary data and
 * functionalities to enable creating a new poll (and using the common poll form).
 * Poll owner data (id and possible name) are "remembered" by storing to browser local
 * storage.
 */
const CreatePollForm = () => {
  const { getUserName, getUserId, updateStorageAfterPollCreated } = useBrowserStorage()
  const { createPoll } = useGraphQLClient()
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const router = useRouter()

  useEffect(() => {
    if (window && !state.userName) {
      const userName = getUserName()
      if (userName) {
        dispatch({ type: Dispatch.SET_USER_NAME, data: userName })
      }
    }
  }, [dispatch, getUserName, state.userName])

  const navigateToDashboard = (code: string) => {
    router.push(`/dashboard/${code}`)
  }

  const buildCreatePollData = (formData: PollFormData): CreatePollInput => {
    const data: CreatePollInput = {
      dataClass: DataClass.Text,
      isAnonymous: formData.isAnonymous,
      optionVotesCountMax: formData.optionVotesCountMax,
      options: formData.votingOptions,
      ownerId: state.userId ?? getUserId(),
      question: formData.question,
      showStatusWhenVoting: formData.showStatusWhenVoting,
      totalVotesCountMax: formData.totalVotesCountMax
    }
    if (!formData.isAnonymous) {
      data.ownerName = formData.ownerName
    }
    return data
  }

  const onSubmit: SubmitHandler<PollFormData> = async (formData: PollFormData) => {
    const data = buildCreatePollData(formData)
    const poll = await createPoll(data)
    if (!poll) return

    dispatch({ type: Dispatch.ADD_POLL, data: poll })
    updateStorageAfterPollCreated(poll)
    navigateToDashboard(poll.code)
  }

  return (
    <Box {...Styles.formContainer} data-cy={DATA_CY_CREATE_POLL_FORM}>
      <PollForm mode={FormMode.CREATE} userName={state.userName} onSubmit={onSubmit} />
    </Box>
  )
}

export default CreatePollForm
