import { Box } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { formContainer } from './styles'
import { OptionEditData, DataClass, EditPollInput } from '../../../types/graphql-schema-types.generated'
import { Option, Poll } from '../../../types/types'
import PollForm, { PollFormData } from './poll-form'
import { TextDateTimeDataHolder } from './text-date-time-data-holder'
import { useContext } from 'react'
import { StateActionType } from '../../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../../state/state-context'
import { useGraphQLClientService } from '../../../hooks/use-graphql-client-service'

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
  const { editPoll } = useGraphQLClientService()
  const { dispatch } = useContext(AppStateContext) as AppStateContextType

  const onSubmit: SubmitHandler<PollFormData> = async (formData: PollFormData) => {
    const input: EditPollInput = {
      pollId: poll.id,
      options: extractOptions(formData.votingOptions, poll.options),
      dataClass: DataClass.Text,
      question: poll?.question ?? null,
      isAnonymous: formData.isAnonymous,
      showStatusWhenVoting: formData.showStatusWhenVoting,
      totalVotesCountMax: formData.totalVotesCountMax,
      optionVotesCountMax: formData.optionVotesCountMax
    }
    const parsedPoll = await editPoll(input, poll.token)
    if (parsedPoll) {
      dispatch({ type: StateActionType.UPDATE_POLL, data: parsedPoll })
    }
  }

  return (
    <Box {...formContainer} data-cy={DATA_CY_EDIT_POLL_FORM_WRAPPER}>
      <PollForm mode="edit" poll={poll} userName={poll.owner.name} onSubmit={onSubmit} />
    </Box>
  )
}

export default EditPollFormWrapper
