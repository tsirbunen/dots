import { v4 as uuidv4 } from 'uuid'
import { Poll } from '../types/types'
import {
  LOCAL_STORAGE_POLL_CODES,
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER_ID
} from '../utils/constant-values'

export type LocalStorageData = {
  token?: string
  userName?: string
  userId: string
  pollCodes: string[]
}

type UseBrowserStorageService = {
  getUserName: () => string | undefined
  getUserId: () => string
  updateToken: (token: string | undefined | null) => void
  getToken: () => string | undefined
  storeUserName: (userName: string) => void
  addToPollsList: (code: string) => void
  clearPollCodes: () => void
  getPollCodes: () => string[]
  updateStorageWithRecentPollsData: (allPolls: Poll[] | undefined) => void
  retrieveLocalStorageData: () => LocalStorageData
  updateAfterPollCreated: (poll: Poll) => void
  handlePollWasUpdated: (poll: Poll) => void
  hasStoredPollCodes: () => boolean
  updateStorageWithPolls: (allPolls: Poll[] | undefined) => void
}

const extractToken = (polls: Poll[]) => {
  let token: string | undefined = undefined
  polls.some((poll) => {
    if (poll.token) {
      token = poll.token
      return true
    }
    return false
  })
  return token
}

export const useBrowserStorageService = (): UseBrowserStorageService => {
  const getUserId = (): string => {
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_USER_ID)) {
      const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID)
      if (userId) return userId
    }
    const id = uuidv4()
    localStorage.setItem(LOCAL_STORAGE_USER_ID, id)
    return id
  }

  const getUserName = (): string | undefined => {
    let userName: string | null = null
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_USER_NAME)) {
      userName = localStorage.getItem(LOCAL_STORAGE_USER_NAME)
    }
    return userName ? userName : undefined
  }

  const updateToken = (token: string | undefined | null) => {
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token)
      return
    }
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_TOKEN)) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN)
    }
  }

  const getToken = (): string | undefined => {
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_TOKEN)) {
      return localStorage.getItem(LOCAL_STORAGE_TOKEN) ?? undefined
    }
  }

  const addToPollsList = (code: string) => {
    let codes: string[] = []
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_POLL_CODES)) {
      const pollCodesJSON = localStorage.getItem(LOCAL_STORAGE_POLL_CODES)
      if (pollCodesJSON) {
        codes = JSON.parse(pollCodesJSON)
      }
    }
    if (!codes.includes(code)) codes.push(code)
    if (codes.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_POLL_CODES, JSON.stringify(codes))
    }
  }

  const replacePollsList = (codes: string[]) => {
    localStorage.setItem(LOCAL_STORAGE_POLL_CODES, JSON.stringify(codes))
  }

  const storeUserName = (userName: string) => {
    localStorage.setItem(LOCAL_STORAGE_USER_NAME, userName)
  }

  const updateUserName = (userName: string) => {
    let currentlyStoredName: string | null = null
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_USER_NAME)) {
      currentlyStoredName = localStorage.getItem(LOCAL_STORAGE_USER_NAME)
    }
    if (currentlyStoredName !== userName) {
      localStorage.setItem(LOCAL_STORAGE_USER_NAME, userName)
    }
  }

  const clearPollCodes = () => {
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_POLL_CODES)) {
      localStorage.removeItem(LOCAL_STORAGE_POLL_CODES)
    }
  }

  const updateStorageWithRecentPollsData = (allPollsFromServer: Poll[] | undefined) => {
    let mostRecentToken: string | undefined | null = undefined
    if (allPollsFromServer) {
      mostRecentToken = extractToken(allPollsFromServer)
    }
    const currentToken = getToken()
    if (mostRecentToken !== currentToken) {
      updateToken(mostRecentToken ?? undefined)
    }
    if (!allPollsFromServer || allPollsFromServer.length === 0) {
      clearPollCodes()
    } else {
      const pollCodes = allPollsFromServer.map((poll) => poll.code)
      replacePollsList(pollCodes)
    }
  }

  const getPollCodes = (): string[] => {
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_POLL_CODES)) {
      const storedPollsJSON = localStorage.getItem(LOCAL_STORAGE_POLL_CODES)
      if (storedPollsJSON) {
        return JSON.parse(storedPollsJSON) as string[]
      }
    }
    return []
  }

  const retrieveLocalStorageData = (): LocalStorageData => {
    const token = getToken()
    const userName = getUserName()
    const userId = getUserId()
    const pollCodes = getPollCodes()
    return { token, userName, userId, pollCodes }
  }

  const updateAfterPollCreated = (poll: Poll) => {
    if (poll.token) updateToken(poll.token)
    if (poll.owner.name) updateUserName(poll.owner.name)
    addToPollsList(poll.code)
  }

  const handlePollWasUpdated = (poll: Poll) => {
    if (poll.token) updateToken(poll.token)
    if (poll.owner.name) updateUserName(poll.owner.name)
  }

  const hasStoredPollCodes = () => {
    const codes = getPollCodes()
    return codes.length > 0
  }

  const updateStorageWithPolls = (allPolls: Poll[] | undefined) => {
    if (allPolls && allPolls.length > 0) {
      const mostRecentToken = extractToken(allPolls)
      const currentToken = getToken()
      if (mostRecentToken !== currentToken) updateToken(mostRecentToken)
      const pollCodes = allPolls.map((poll) => poll.code)
      replacePollsList(pollCodes)
    } else {
      clearPollCodes()
    }
  }

  return {
    getUserId,
    updateToken,
    clearPollCodes,
    getUserName,
    storeUserName,
    addToPollsList,
    getPollCodes,
    getToken,
    updateStorageWithRecentPollsData,
    retrieveLocalStorageData,
    updateAfterPollCreated,
    handlePollWasUpdated,
    hasStoredPollCodes,
    updateStorageWithPolls
  }
}
