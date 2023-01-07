import { graphqlClient } from '../../graphql-client/graphql-client'
import { useToast } from '../../hooks/use-toast'
import { useTranslation } from '../../hooks/use-translation'
import { Poll } from '../../types/types'
import { validatePollsData } from '../../utils/validations'
import { ToastType } from '../widgets/toast/toast'
import { FindPollsByCodeDocument, FindPollsByCodeQuery, FindPollsByCodeQueryVariables } from './operations.generated'

type UseGraphQLClientService = {
  findPollsByCode: (codes: string[], token: string) => Promise<Poll[] | undefined>
}

export const useGraphQLClientService = (): UseGraphQLClientService => {
  const { showToast } = useToast()
  const { translate } = useTranslation()

  const findPollsByCode = async (codes: string[], token: string): Promise<Poll[] | undefined> => {
    try {
      const response = await graphqlClient.query<FindPollsByCodeQuery, FindPollsByCodeQueryVariables>({
        query: FindPollsByCodeDocument,
        variables: { codes },
        context: {
          headers: {
            authorization: token
          }
        }
      })

      if (!response.data?.findPollsByCode) {
        throw new Error(response.errors?.toString())
      }

      const pollsData = response.data.findPollsByCode
      console.log({ pollsData })
      const polls = validatePollsData(pollsData)
      return polls
    } catch (error) {
      console.log(error)
      showToast({
        message: translate('toast_fetch_polls_by_id_or_code_error'),
        type: ToastType.ERROR,
        toastId: `${ToastType.ERROR}-${new Date().toUTCString()}`
      })
    }
  }

  return { findPollsByCode }
}
