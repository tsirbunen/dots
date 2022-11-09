import { expect } from 'chai'
import 'mocha'
import axios from 'axios'
import dns from 'dns'

const HOST = 'localhost'
const SERVER_URL = `http://${HOST}:3001`

// THIS IS REQUIRED FOR Node > 17 requests to work as written for Node 16!
dns.setDefaultResultOrder('ipv4first')

describe('SERVER HEALTH', () => {
  it('A get request to route "/ping" returns a "pong"', async () => {
    const response = await axios.get(`${SERVER_URL}/ping`)
    expect(response.data).to.equal('pong')
  })
})
