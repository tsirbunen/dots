import { v4 as uuidv4 } from 'uuid'
import { Poll } from '../types/types'
import {
  LOCAL_STORAGE_POLL_CODES,
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_USER_ID,
  LOCAL_STORAGE_CODE_TOKEN_PAIRS
} from '../utils/constant-values'

export type LocalStorageData = {
  userName?: string
  userId: string
  pollCodeTokenPairs: CodeTokenPair[]
}

export type CodeTokenPair = {
  code: string
  token?: string
}

type UseBrowserStorageService = {
  getUserName: () => string | undefined
  getUserId: () => string
  storeUserName: (userName: string) => void
  addToPollsList: (code: string) => void
  clearPollCodes: () => void
  getPollCodes: () => string[]
  retrieveLocalStorageData: () => LocalStorageData
  updateStorageAfterPollEdited: (poll: Poll) => void
  storedPollCodesExist: () => boolean
  updateStorageAfterPollCreated: (poll: Poll) => void
  getPollToken: (code: string) => string | null | undefined
}

export const useBrowserStorage = (): UseBrowserStorageService => {
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

  const getPollCodeTokenPairs = () => {
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_CODE_TOKEN_PAIRS)) {
      const storedPairsJSON = localStorage.getItem(LOCAL_STORAGE_CODE_TOKEN_PAIRS)
      if (storedPairsJSON) {
        return JSON.parse(storedPairsJSON) as CodeTokenPair[]
      }
    }
    return []
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

  const getPollCodes = (): string[] => {
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_POLL_CODES)) {
      const storedPollsJSON = localStorage.getItem(LOCAL_STORAGE_POLL_CODES)
      if (storedPollsJSON) {
        return JSON.parse(storedPollsJSON) as string[]
      }
    }
    return []
  }

  const getPollToken = (code: string): string | null | undefined => {
    let codeTokenPairs: CodeTokenPair[] = []
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_CODE_TOKEN_PAIRS)) {
      const storedCodeTokenPairsJSON = localStorage.getItem(LOCAL_STORAGE_CODE_TOKEN_PAIRS)
      if (storedCodeTokenPairsJSON) {
        codeTokenPairs = JSON.parse(storedCodeTokenPairsJSON) as CodeTokenPair[]
        return codeTokenPairs.find((pair) => pair.code === code)?.token
      }
    }
  }

  const retrieveLocalStorageData = (): LocalStorageData => {
    const userName = getUserName()
    const userId = getUserId()
    const pollCodeTokenPairs = getPollCodeTokenPairs()
    return { userName, userId, pollCodeTokenPairs }
  }

  const addCodeTokenPairToStorage = (code: string, token: string) => {
    let codeTokenPairs: CodeTokenPair[] = []
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_CODE_TOKEN_PAIRS)) {
      const storedCodeTokenPairsJSON = localStorage.getItem(LOCAL_STORAGE_CODE_TOKEN_PAIRS)
      if (storedCodeTokenPairsJSON) {
        codeTokenPairs = JSON.parse(storedCodeTokenPairsJSON) as CodeTokenPair[]
      }
    }
    codeTokenPairs.push({ code, token })
    localStorage.setItem(LOCAL_STORAGE_CODE_TOKEN_PAIRS, JSON.stringify(codeTokenPairs))
  }

  const updateStorageAfterPollCreated = (poll: Poll) => {
    if (poll.owner.name) updateUserName(poll.owner.name)
    addCodeTokenPairToStorage(poll.code, poll.token)
  }

  const updateStorageAfterPollEdited = (poll: Poll) => {
    if (poll.owner.name) updateUserName(poll.owner.name)
  }

  const storedPollCodesExist = () => {
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_CODE_TOKEN_PAIRS)) {
      const storedCodeTokenPairsJSON = localStorage.getItem(LOCAL_STORAGE_CODE_TOKEN_PAIRS)
      if (storedCodeTokenPairsJSON) {
        return (JSON.parse(storedCodeTokenPairsJSON) as CodeTokenPair[]).length > 0
      }
    }
    return false
  }

  return {
    getUserId,
    clearPollCodes,
    getUserName,
    storeUserName,
    addToPollsList,
    getPollCodes,
    updateStorageAfterPollEdited,
    retrieveLocalStorageData,
    storedPollCodesExist,
    updateStorageAfterPollCreated,
    getPollToken
  }
}
