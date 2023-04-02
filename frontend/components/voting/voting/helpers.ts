import { cloneDeep } from 'lodash'
import hash from 'hash-it'
import { Option, Vote } from '../../../types/types'
import { DOT_COLORS } from '../../../utils/constant-values'
import { SubscribedVote } from './voting'

export const calculateOptionVotesGiven = (optionVotes: Vote[], userId: string) => {
  return optionVotes.reduce((acc, curr) => {
    if (curr.voterId === userId) return acc + 1
    return acc
  }, 0)
}

export const calculateTotalVotesGiven = (options: Option[], userId: string) => {
  return options.reduce((acc, curr) => {
    return acc + calculateOptionVotesGiven(curr.votes, userId)
  }, 0)
}

export const calculateTotalVotesLeft = (options: Option[], userId: string, maxTotal: number) => {
  const totalVotesGiven = calculateTotalVotesGiven(options, userId)
  return maxTotal - totalVotesGiven
}

export const getOptionsWithNewVoteAdded = (options: Option[], vote: Vote): Option[] => {
  const updated = cloneDeep(options)
  updated.forEach((option) => {
    if (option.id === vote.optionId) {
      option.votes.push(vote)
    }
    return option
  })
  return updated
}

export const getVoterNames = (optionsWithVotes: Option[], userId: string): string[] => {
  const voterNames = new Set<string>()
  optionsWithVotes.forEach((option) => {
    option.votes.forEach((vote) => {
      if (vote.voterId !== userId) voterNames.add(vote.name)
    })
  })
  return voterNames.size > 0 ? Array.from(voterNames) : []
}

export const getVoterNameDotColorPairs = (optionsWithVotes: Option[], userId: string): Record<string, string> => {
  const voterNames = getVoterNames(optionsWithVotes, userId)
  const voters: Record<string, string> = {}
  Array.from(voterNames).forEach((voterName, index) => {
    const color = DOT_COLORS[index]
    voters[voterName] = color
  })
  return voters
}

export const checkIfIsMyVote = (newVote: SubscribedVote, userId: string): boolean => {
  const hashedUserId = hash(userId).toString()
  return newVote.voterId === hashedUserId
}

export const checkIfVoteAlreadyAdded = (optionsWithVotes: Option[], newVote: SubscribedVote): boolean => {
  const voteAlreadyAdded = optionsWithVotes.some((option) => {
    return option.votes.some((vote) => vote.id === newVote.id)
  })

  return voteAlreadyAdded
}

export const getVoterName = (optionsWithVotes: Option[], newVote: SubscribedVote): string => {
  let voterName: string | undefined = undefined
  let maxVoterIndex = -1
  optionsWithVotes.forEach((option) => {
    option.votes.forEach((vote) => {
      if (vote.name.includes('voter-')) {
        const index = Number(vote.name.split('-')[1])
        if (index > maxVoterIndex) maxVoterIndex = index
      }
      if (vote.voterId === newVote.voterId) voterName = vote.name
    })
  })

  if (!voterName) {
    voterName = `voter-${maxVoterIndex + 1}`
  }
  return voterName
}

export const addSubscribedVoteToOptions = (
  optionsWithVotes: Option[],
  newVote: SubscribedVote,
  newName: string
): Option[] => {
  const updatedData = optionsWithVotes.map((option) => {
    if (option.id === newVote.optionId) {
      const updatedOption = cloneDeep(option)
      const voteToAdd = {
        id: newVote.id,
        optionId: newVote.optionId,
        voterId: newVote.voterId,
        name: newName
      }
      updatedOption.votes.push(voteToAdd)
      return updatedOption
    } else {
      return cloneDeep(option)
    }
  })
  return updatedData
}
