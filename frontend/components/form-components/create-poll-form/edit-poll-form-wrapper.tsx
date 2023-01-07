import { Box } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { formContainer } from './styles'
import { OptionEditData, DataClass, EditPollInput } from '../../../types/graphql-schema-types.generated'
import { useGraphQLClientService } from './use-graphql-client-service'
import { Option, Poll } from '../../../types/types'
import CreateOrEditPollFormCore, { CreatePollFormData } from './create-or-edit-poll-form-core'
import { TextDateTimeDataHolder } from './text-date-time-data-holder'
import { useContext } from 'react'
import { AppStateActionEnum } from '../../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../../state/state-context'

export const DATA_CY_EDIT_POLL_FORM_WRAPPER = 'edit_poll_form_wrapper'

type EditPollFormWrapperProps = {
  poll: Poll
}

const extractOptions = (votingOptions: TextDateTimeDataHolder[], previousOptions: Option[]): OptionEditData[] => {
  const optionContents: Record<string, string> = {}
  previousOptions.forEach((option) => {
    optionContents[option.content] = option.id
  })
  return votingOptions.map((votingOption) => {
    const content = votingOption.text as string
    const option: OptionEditData = { content }
    if (optionContents[content]) option.optionId = optionContents[content]
    return option
  })
}

const EditPollFormWrapper = ({ poll }: EditPollFormWrapperProps) => {
  const { editPollInput } = useGraphQLClientService()
  const { dispatch } = useContext(AppStateContext) as AppStateContextType

  const onSubmit: SubmitHandler<CreatePollFormData> = async (formData: CreatePollFormData) => {
    const options = extractOptions(formData.votingOptions, poll.options)
    const strippedData: Partial<CreatePollFormData> = { ...formData }
    delete strippedData.votingOptions
    delete strippedData.ownerName

    const editPollInputData: EditPollInput = {
      pollId: poll.id,
      options,
      dataClass: DataClass.Text,
      question: poll?.question ?? '',
      isAnonymous: formData.isAnonymous,
      showStatusWhenVoting: formData.showStatusWhenVoting,
      totalVotesCountMax: formData.totalVotesCountMax,
      optionVotesCountMax: formData.optionVotesCountMax
    }
    const parsedPoll = await editPollInput(editPollInputData, poll.token)
    if (parsedPoll) {
      dispatch({ type: AppStateActionEnum.UPDATE_POLL, data: parsedPoll })
    }
  }

  return (
    <Box {...formContainer} data-cy={DATA_CY_EDIT_POLL_FORM_WRAPPER}>
      <CreateOrEditPollFormCore mode="edit" poll={poll} userName={poll.owner.name} onSubmit={onSubmit} />
    </Box>
  )
}

export default EditPollFormWrapper
