import { cloneDeep } from 'lodash'
import { Option, Vote } from '../../../types/types'
import { DOT_COLORS } from '../../../utils/constant-values'

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

// export const getVotersNamesString = (optionsWithVotes: Option[], userId: string) => {
//   return getVoterNames(optionsWithVotes, userId).join('')
// }

export const getVoterNameDotColorPairs = (optionsWithVotes: Option[], userId: string): Record<string, string> => {
  const voterNames = getVoterNames(optionsWithVotes, userId)
  const voters: Record<string, string> = {}
  Array.from(voterNames).forEach((voterName, index) => {
    const color = DOT_COLORS[index]
    voters[voterName] = color
  })
  return voters
}
