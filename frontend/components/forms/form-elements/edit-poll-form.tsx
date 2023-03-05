import { Box } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { Styles } from './styles'
import { OptionEditData, DataClass, EditPollInput } from '../../../types/graphql-schema-types.generated'
import { Option, Poll } from '../../../types/types'
import { PollForm, PollFormData } from './poll-form'
import { useContext, useEffect } from 'react'
import { StateActionType } from '../../../state/reducer'
import { AppStateContext, AppStateContextType } from '../../../state/state-context'
import { useGraphQLClient } from '../../../hooks/use-graphql-client'
import { FormMode } from './action-buttons'
import { useBrowserStorage } from '../../../hooks/use-browser-storage'

export const DATA_CY_EDIT_POLL_FORM = 'edit_poll_form'

type EditPollFormWrapperProps = {
  poll: Poll
}

/**
 * This component equips the common "core" poll form component with necessary data and
 * functionalities to enable editing an existing poll (and using the common poll form).
 * Poll owner data (id and possible name) are "remembered" by storing to browser local
 * storage.
 */

const EditPollForm = ({ poll }: EditPollFormWrapperProps) => {
  const { getUserName, updateAfterPollEdited } = useBrowserStorage()
  const { editPoll } = useGraphQLClient()
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  useEffect(() => {
    console.log('running effect on page edit poll')
    if (window && !state.userName) {
      const userName = getUserName()
      if (userName) {
        dispatch({ type: StateActionType.SET_USER_NAME, data: userName })
      }
    }
  }, [dispatch, getUserName, state.userName])

  const attachExistingIdsToOptions = (newOptions: string[], previousOptions: Option[]): OptionEditData[] => {
    const existingOptionIdsByContent: Record<string, string> = {}
    previousOptions.forEach((previousOption) => {
      existingOptionIdsByContent[previousOption.content] = previousOption.id
    })
    return newOptions.map((newOption) => {
      const option: OptionEditData = { content: newOption }
      if (existingOptionIdsByContent[newOption]) {
        option.optionId = existingOptionIdsByContent[newOption]
      }
      return option
    })
  }

  const buildPollData = (formData: PollFormData): EditPollInput => {
    return {
      pollId: poll.id,
      options: attachExistingIdsToOptions(formData.votingOptions, poll.options),
      dataClass: DataClass.Text,
      question: poll?.question ?? null,
      isAnonymous: formData.isAnonymous,
      showStatusWhenVoting: formData.showStatusWhenVoting,
      totalVotesCountMax: formData.totalVotesCountMax,
      optionVotesCountMax: formData.optionVotesCountMax
    }
  }

  const onSubmit: SubmitHandler<PollFormData> = async (formData: PollFormData) => {
    const input: EditPollInput = buildPollData(formData)
    const editedPoll = await editPoll(input, poll.token)
    if (editedPoll) {
      updateAfterPollEdited(editedPoll)
      dispatch({ type: StateActionType.UPDATE_POLL, data: editedPoll })
    }
  }

  return (
    <Box {...Styles.formContainer} data-cy={DATA_CY_EDIT_POLL_FORM}>
      <PollForm mode={FormMode.EDIT} poll={poll} userName={poll.owner.name} onSubmit={onSubmit} />
    </Box>
  )
}

export default EditPollForm
