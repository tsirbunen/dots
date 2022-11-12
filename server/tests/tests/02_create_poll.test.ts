import { expect } from 'chai'
import 'mocha'
import dns from 'dns'
import { POLL_INPUT_DATA } from '../data/polls'
import { getGraphQLClient } from '../utils/get-graphql-client'
import { createPollMutation } from '../utils/test-queries'
import { assertPollFieldsArePracticallySameWhenPresent, assertObjectIsAPoll } from '../utils/assertions'
import { PollType } from '../../modules/poll/mutation-resolvers'

// THIS IS REQUIRED FOR Node > 17 requests to work as written for Node 16!
dns.setDefaultResultOrder('ipv4first')

describe('CREATE POLL', () => {
  it('A new poll can be created if proper input data is used in creating the poll', async () => {
    const pollInputData = POLL_INPUT_DATA[0]
    const graphQLClient = getGraphQLClient()
    const query = createPollMutation
    const response: { createPoll: PollType } = await graphQLClient.request(query, { input: pollInputData })
    assertObjectIsAPoll(response.createPoll, false)
    assertPollFieldsArePracticallySameWhenPresent(pollInputData, response.createPoll)
  })
})
