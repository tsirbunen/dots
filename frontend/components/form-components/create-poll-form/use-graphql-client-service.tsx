import { graphqlClient } from '../../../graphql-client/graphql-client'
import {
  CreatePollMutation,
  CreatePollMutationVariables,
  CreatePollDocument,
  EditPollDocument,
  EditPollMutation,
  EditPollMutationVariables
} from './operations.generated'
import { CreatePollInput, EditPollInput } from '../../../types/graphql-schema-types.generated'
import { useToast } from '../../../hooks/use-toast'
import { useTranslation } from '../../../hooks/use-translation'
import { ToastType } from '../../widgets/toast/toast'
import { Poll } from '../../../types/types'
import { validatePollData } from '../../../utils/validations'

type UseGraphQLClientService = {
  createPoll: (input: CreatePollInput) => Promise<Poll | undefined>
  editPollInput: (input: EditPollInput, pollToken: string) => Promise<Poll | undefined>
}

export const useGraphQLClientService = (): UseGraphQLClientService => {
  const { showToast } = useToast()
  const { translate } = useTranslation()

  const createPoll = async (input: CreatePollInput): Promise<Poll | undefined> => {
    try {
      const response = await graphqlClient.mutate<CreatePollMutation, CreatePollMutationVariables>({
        mutation: CreatePollDocument,
        variables: { input }
      })

      if (!response.data?.createPoll) {
        throw new Error(response.errors?.toString())
      }

      const createPollData = response.data.createPoll
      const poll = validatePollData(createPollData)
      return poll
    } catch (error) {
      console.log(error)
      showToast({
        message: translate('toast_create_poll_error'),
        type: ToastType.ERROR,
        toastId: `${ToastType.ERROR}-${new Date().toUTCString()}`
      })
    }
  }

  const editPollInput = async (input: EditPollInput, pollToken: string): Promise<Poll | undefined> => {
    try {
      const response = await graphqlClient.mutate<EditPollMutation, EditPollMutationVariables>({
        mutation: EditPollDocument,
        variables: { input },
        context: {
          headers: {
            authorization: pollToken
          }
        }
      })

      if (!response.data?.editPoll) {
        throw new Error(response.errors?.toString())
      }

      const editPollData = response.data.editPoll
      const poll = validatePollData(editPollData)
      return poll
    } catch (error) {
      console.log(error)
      showToast({
        message: translate('toast_edit_poll_error'),
        type: ToastType.ERROR,
        toastId: `${ToastType.ERROR}-${new Date().toUTCString()}`
      })
    }
  }

  return { createPoll, editPollInput }
}
