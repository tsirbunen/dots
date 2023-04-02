import { PARTICIPANTS_COUNT_MAX } from './constant-values'

export class Errors {
  static get maxParticipantsReached(): string {
    return `Max participants limit of ${PARTICIPANTS_COUNT_MAX} 
            has already been reached. Cannot vote anymore!`
  }

  static get pollNotInVoteState(): string {
    return 'Cannot vote in a poll that is not in the "voting" state!'
  }

  static optionDoesNotExist(optionId: string): string {
    return `Valid option with id ${optionId} does not exist in the database!`
  }

  static maxVotesPerPollAlreadyGiven(maxCount: number): string {
    return `Cannot vote this option. Allowed total max (${maxCount}) already given.`
  }

  static maxVotesPerOptionAlready(maxCount: number): string {
    return `Cannot vote this option. Allowed max per option (${maxCount}) already given.`
  }

  static failedToRetrieveOrInsertPerson(personId: string): string {
    return `Failed to retrieve or insert person with id ${personId} to database`
  }

  static personDoesNotExist(identifier: string): string {
    return `Person with id/code  ${identifier} could not be found in the database!`
  }

  static failedToInsertVote(voteId: string): string {
    return `Failed to insert vote with id ${voteId} to database`
  }

  static pollDoesNotExist(identifier: string): string {
    return `Valid poll with identifier ${identifier} does not exist in the database!`
  }

  static failedToInsertPoll(pollId: string): string {
    return `Failed to insert poll with id ${pollId} to database`
  }

  static get findPollByCodeRequiresCode(): string {
    return 'Find poll by CODE needs the the CODE!'
  }

  static get notAuthorized(): string {
    return 'Not authorized to perform this action!'
  }

  static get pollNotInEditState(): string {
    return 'A poll that is not in the "edit" state cannot be edited!'
  }

  static failedEditingPoll(pollId: string): string {
    return `Failed editing poll with id ${pollId}`
  }

  static pollInputFieldValueNotInRange(fieldName: string, minValue: number, maxValue: number): string {
    return `${fieldName} in poll input must be in range ${minValue} ... ${maxValue}`
  }

  static validationDetails(errorDetails: string): string {
    return `Validation error for model ${errorDetails}`
  }

  static failedToFindPollByOptionId(optionId: string): string {
    return `Failed to find poll by option id ${optionId}`
  }
}
