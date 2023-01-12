import { v4 as uuidv4 } from 'uuid'
import { Poll } from '../types/types'
import {
  LOCAL_STORAGE_POLL_CODES,
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER_ID
} from '../utils/constant-values'

type UseBrowserStorageService = {
  getUserNameIfExists: () => string | undefined
  getUserId: () => string
  updateToken: (token: string | undefined | null) => void
  getToken: () => string | undefined
  storeUserName: (userName: string) => void
  hasStoredPollCodes: () => boolean
  addToPollsList: (pollId: string) => void
  clearPollCodes: () => void
  getPollCodes: () => string[]
  updateStorageWithRecentPollsData: (allPolls: Poll[] | undefined) => void
}

const extractMostRecentToken = (allPolls: Poll[]) => {
  let token: string | undefined = undefined
  allPolls.some((poll) => {
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

  const getUserNameIfExists = (): string | undefined => {
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

  const hasStoredPollCodes = (): boolean => {
    const codes = getPollCodes()
    return codes.length > 0
  }

  const clearPollCodes = () => {
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_POLL_CODES)) {
      localStorage.removeItem(LOCAL_STORAGE_POLL_CODES)
    }
  }

  const updateStorageWithRecentPollsData = (allPollsFromServer: Poll[] | undefined) => {
    let mostRecentToken: string | undefined | null = undefined
    if (allPollsFromServer) {
      mostRecentToken = extractMostRecentToken(allPollsFromServer)
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

  return {
    getUserId,
    updateToken,
    clearPollCodes,
    getUserNameIfExists,
    storeUserName,
    addToPollsList,
    hasStoredPollCodes,
    getPollCodes,
    getToken,
    updateStorageWithRecentPollsData
  }
}
