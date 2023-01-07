import { graphqlClient } from '../../../graphql-client/graphql-client'
import { OpenPollDocument, OpenPollMutation, OpenPollMutationVariables } from './operations.generated'
import { useToast } from '../../../hooks/use-toast'
import { useTranslation } from '../../../hooks/use-translation'
import { ToastType } from '../../widgets/toast/toast'

type UseGraphQLClientService = {
  openPoll: (pollId: string, pollToken: string) => Promise<boolean | undefined>
}

export const useGraphQLClientService = (): UseGraphQLClientService => {
  const { showToast } = useToast()
  const { translate } = useTranslation()

  const openPoll = async (pollId: string, pollToken: string): Promise<boolean | undefined> => {
    try {
      const response = await graphqlClient.mutate<OpenPollMutation, OpenPollMutationVariables>({
        mutation: OpenPollDocument,
        variables: { pollId },
        context: {
          headers: {
            authorization: pollToken
          }
        }
      })

      if (!response.data?.openPoll) {
        throw new Error(response.errors?.toString())
      }

      return true
    } catch (error) {
      console.log(error)
      showToast({
        message: translate('toast_open_poll_error'),
        type: ToastType.ERROR,
        toastId: `${ToastType.ERROR}-${new Date().toUTCString()}`
      })
    }
  }

  return { openPoll }
}
