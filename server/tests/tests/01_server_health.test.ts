import 'reflect-metadata'
import { assert, expect } from 'chai'
import 'mocha'
import axios from 'axios'
import dns from 'dns'

dns.setDefaultResultOrder('ipv4first')

const HOST = 'localhost'
const SERVER_URL = `http://${HOST}:3001`

describe('SERVER HEALTH', () => {
  it('A get request to route "/ping" returns a "pong"', async () => {
    const response = await axios.get(`${SERVER_URL}/ping`)
    expect(response.data).to.equal('pong')
  })

  it('A get request to route "/health" returns "ok"', async () => {
    const response = await axios.get(`${SERVER_URL}/health`)
    expect(response.data).to.equal('ok')
  })

  it('A GraphQL query "ping" returns "pong"', async () => {
    const headers = { 'content-type': 'application/json' }
    const pingQuery = ` { ping } `
    const response = await axios.request({
      method: 'POST',
      url: `${SERVER_URL}/graphql`,
      headers: headers,
      data: {
        query: pingQuery
      }
    })

    expect(response.data.data.ping).to.equal('pong')
  })

  it('Server is connected to database as poll count in database can be queried', async () => {
    const headers = { 'content-type': 'application/json' }
    const pollCountQuery = ` { getPollCountInDatabase } `
    const response = await axios.request({
      method: 'POST',
      url: `${SERVER_URL}/graphql`,
      headers: headers,
      data: {
        query: pollCountQuery
      }
    })

    assert.isNumber(response.data.data.getPollCountInDatabase, 'Number of polls in database')
  })
})
