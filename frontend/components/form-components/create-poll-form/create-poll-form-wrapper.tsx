import { Box } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { formContainer } from './styles'
import { useBrowserStorageService } from '../../../hooks/use-browser-storage-service'
import { CreatePollInput, DataClass } from '../../../types/graphql-schema-types.generated'
import { useGraphQLClientService } from './use-graphql-client-service'
import { useContext, useEffect, useState } from 'react'
import PollCreatedInfo from '../../widgets/poll-created-info/poll-created-info'
import { Poll } from '../../../types/types'
import CreateOrEditPollFormCore, { CreatePollFormData } from './create-or-edit-poll-form-core'
import { AppStateActionEnum } from '../../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../../state/state-context'

export const DATA_CY_CREATE_POLL_FORM_WRAPPER = 'create_poll_form_wrapper'

const CreatePollFormWrapper = () => {
  const [pollCreated, setPollCreated] = useState<Poll | undefined>(undefined)
  const [userName, setUserName] = useState<string | undefined | null>(null)
  const { getUserNameIfExists, getUserId, updateToken, addToPollsList, storeUserName } = useBrowserStorageService()
  const { createPoll } = useGraphQLClientService()
  const { dispatch } = useContext(AppStateContext) as AppStateContextType

  useEffect(() => {
    if (window) {
      setUserName(getUserNameIfExists())
    }
  }, [getUserNameIfExists])

  const onSubmit: SubmitHandler<CreatePollFormData> = async (formData: CreatePollFormData) => {
    const options = formData.votingOptions.map((a) => a.text) as string[]
    const strippedData: Partial<CreatePollFormData> = { ...formData }
    delete strippedData.votingOptions
    const createPollInputData: CreatePollInput = {
      ...(strippedData as CreatePollInput),
      ownerId: getUserId(),
      options,
      dataClass: DataClass.Text
    }

    const parsedPoll = await createPoll(createPollInputData)
    console.log({ parsedPoll })
    if (parsedPoll) {
      dispatch({ type: AppStateActionEnum.ADD_POLL, data: parsedPoll })
      updateToken(parsedPoll.token)
      addToPollsList(parsedPoll.code)
      storeUserName(parsedPoll.owner.name)
      setPollCreated(parsedPoll)
    }
  }

  if (pollCreated) {
    return <PollCreatedInfo createdPoll={pollCreated} />
  }
  if (userName === null) return null

  return (
    <Box {...formContainer} data-cy={DATA_CY_CREATE_POLL_FORM_WRAPPER}>
      <CreateOrEditPollFormCore mode="create" userName={userName} poll={undefined} onSubmit={onSubmit} />
    </Box>
  )
}

export default CreatePollFormWrapper
