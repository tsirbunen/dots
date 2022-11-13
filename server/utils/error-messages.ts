export function getMaxVotesPerAnswerAlreadyGivenErrorMessage(maxCount: number): string {
  return `Cannot vote this answer. Allowed max per answer (${maxCount}) already given.`
}

export function getMaxVotesPerPollAlreadyGivenErrorMessage(maxCount: number): string {
  return `Cannot vote this answer. Allowed total max (${maxCount}) already given.`
}
