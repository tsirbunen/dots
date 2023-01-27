import { Box } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { formContainer } from './styles'
import { useBrowserStorageService } from '../../../hooks/use-browser-storage-service'
import { CreatePollInput, DataClass } from '../../../types/graphql-schema-types.generated'
import { useContext, useEffect } from 'react'
import PollForm, { PollFormData } from './poll-form'
import { StateActionType } from '../../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../../state/state-context'
import { useRouter } from 'next/router'
import { useGraphQLClientService } from '../../../hooks/use-graphql-client-service'

export const DATA_CY_CREATE_POLL_FORM_WRAPPER = 'create_poll_form_wrapper'

const CreatePollFormWrapper = () => {
  const { getUserName, getUserId, updateAfterPollCreated } = useBrowserStorageService()
  const { createPoll } = useGraphQLClientService()
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const router = useRouter()

  useEffect(() => {
    console.log('running effect on page create poll')
    if (window && !state.userName) {
      const userName = getUserName()
      if (userName) {
        dispatch({ type: StateActionType.SET_USER_NAME, data: userName })
      }
    }
  }, [dispatch, getUserName, state.userName])

  const onSubmit: SubmitHandler<PollFormData> = async (formData: PollFormData) => {
    const options = formData.votingOptions.map((a) => a.text) as string[]
    const strippedData: Partial<PollFormData> = { ...formData }
    if (!formData.isAnonymous && state.userName) {
      strippedData.ownerName = state.userName
    }
    delete strippedData.votingOptions
    const createPollInputData: CreatePollInput = {
      ...(strippedData as CreatePollInput),
      ownerId: state.userId ?? getUserId(),
      options,
      dataClass: DataClass.Text
    }

    const parsedPoll = await createPoll(createPollInputData)
    if (parsedPoll) {
      dispatch({ type: StateActionType.ADD_POLL, data: parsedPoll })
      updateAfterPollCreated(parsedPoll)
      router.push(`/dashboard/${parsedPoll?.code}`)
    }
  }

  return (
    <Box {...formContainer} data-cy={DATA_CY_CREATE_POLL_FORM_WRAPPER}>
      <PollForm mode="create" userName={state.userName} poll={undefined} onSubmit={onSubmit} />
    </Box>
  )
}

export default CreatePollFormWrapper
