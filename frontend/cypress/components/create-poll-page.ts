import { Base } from './base'
import { DATA_CY_FORM_TEXT_INPUT_BUTTON } from '../../components/form-components/text-type-form-input/text-type-input'
import { DATA_CY_INPUT_MODAL } from '../../components/widgets/input-modal/input-modal'
import { EN_TRANSLATIONS } from '../../localization/en'
import { DATA_CY_MODAL_ADD, DATA_CY_MODAL_INPUT_TEXT } from '../../components/widgets/input-modal/text-input'
import { DATA_CY_LIST_ADD } from '../../components/form-components/text-date-time-list-form-input/text-date-time-list-form-input'
import { DATA_CY_MODAL_DATA_TYPE_SELECTOR } from '../../components/widgets/input-modal/data-type-selector'
import { DATA_CY_SMALL_BUTTON } from '../../components/widgets/small-button/small-button'
import {
  DATA_CY_RESET,
  DATA_CY_SUBMIT
} from '../../components/form-components/create-poll-form/create-or-edit-poll-form-core'
import { TEXT_LENGTH_MAX, TEXT_LENGTH_QUESTION_MIN, VOTING_OPTIONS_MAX } from '../../utils/constant-values'

export class CreatePollPage extends Base {
  verifySetPollQuestionModalVisibility(isVisible: boolean) {
    if (isVisible) {
      cy.getByDataCy(DATA_CY_INPUT_MODAL).within(() => {
        cy.contains(EN_TRANSLATIONS.add_voting_question_modal_title)
        this.verifyDataCyIsVisible(DATA_CY_MODAL_INPUT_TEXT)
        this.verifyDataCyIsVisible(`${DATA_CY_SMALL_BUTTON}-${DATA_CY_MODAL_ADD}`)
      })
    } else {
      this.verifyDataCyDoesNotExist(DATA_CY_INPUT_MODAL)
    }
  }

  typePollQuestionToInputField(pollQuestion: string) {
    cy.getByDataCy(DATA_CY_INPUT_MODAL).within(() => {
      const inputField = cy.getByDataCy(DATA_CY_MODAL_INPUT_TEXT)
      inputField.type(pollQuestion)
    })
  }

  clickModalAddButton() {
    cy.getByDataCy(DATA_CY_INPUT_MODAL).within(() => {
      const addButton = cy.getByDataCy(`${DATA_CY_SMALL_BUTTON}-${DATA_CY_MODAL_ADD}`)
      addButton.click()
    })
  }

  verifyTextIsVisible(text: string) {
    cy.contains(text)
  }

  verifyAddVotingOptionModalVisibility(isVisible: boolean) {
    if (isVisible) {
      cy.getByDataCy(DATA_CY_INPUT_MODAL).within(() => {
        cy.contains(EN_TRANSLATIONS.add_voting_option_modal_title)
        this.verifyDataCyIsVisible(DATA_CY_MODAL_DATA_TYPE_SELECTOR)
        this.verifyDataCyIsVisible(DATA_CY_MODAL_INPUT_TEXT)
        this.verifyDataCyIsVisible(`${DATA_CY_SMALL_BUTTON}-${DATA_CY_MODAL_ADD}`)
      })
    } else {
      this.verifyDataCyDoesNotExist(DATA_CY_MODAL_DATA_TYPE_SELECTOR)
      this.verifyDataCyDoesNotExist(DATA_CY_INPUT_MODAL)
    }
  }

  typeVotingOptionToInputField(votingOption: string) {
    cy.getByDataCy(DATA_CY_INPUT_MODAL).within(() => {
      const inputField = cy.getByDataCy(DATA_CY_MODAL_INPUT_TEXT)
      inputField.type(votingOption)
    })
  }

  verifyVotingOptionIsSet(votingOption: string) {
    cy.contains(votingOption)
  }

  verifyButtonIsDisabled(button: 'reset' | 'submit' | 'addVotingOption', isDisabled: boolean) {
    let dataCy = ''
    switch (button) {
      case 'reset':
        dataCy = `${DATA_CY_SMALL_BUTTON}-${DATA_CY_RESET}`
        break
      case 'submit':
        dataCy = `${DATA_CY_SMALL_BUTTON}-${DATA_CY_SUBMIT}`
        break
      case 'addVotingOption':
        dataCy = DATA_CY_LIST_ADD
        break

      default:
        throw new Error(`Button ${button} not available!`)
    }

    if (isDisabled) cy.getByDataCy(dataCy).should('be.disabled')
    else cy.getByDataCy(dataCy).not('be.disabled')
  }

  verifyButtonStatus(button: 'modal add', status: 'is visible' | 'is not visible' | 'does not exist') {
    let postfix = ''
    if (button === 'modal add') postfix = DATA_CY_MODAL_ADD
    switch (status) {
      case 'is visible':
        this.verifyDataCyIsVisible(`${DATA_CY_SMALL_BUTTON}-${postfix}`)
        break
      case 'is not visible':
        this.verifyDataCyIsNotVisible(`${DATA_CY_SMALL_BUTTON}-${postfix}`)
        break
      case 'does not exist':
        this.verifyDataCyDoesNotExist(`${DATA_CY_SMALL_BUTTON}-${postfix}`)
        break
      default:
        throw new Error(`Button status ${status} has not been implemented!`)
    }
  }

  giveMaxAllowedCountOfVotingOptions() {
    for (let i = 0; i < VOTING_OPTIONS_MAX; i++) {
      this.clickProperAddTextModalOpen('voting option')
      this.typeVotingOptionToInputField(`random option name ${i}`)
      this.clickModalAddButton()
    }
  }

  clickProperAddTextModalOpen(targetField: 'poll question' | 'voting option') {
    let startAddingButton
    if (targetField === 'poll question') {
      startAddingButton = cy.getByDataCy(`${DATA_CY_FORM_TEXT_INPUT_BUTTON}-question`)
    } else if (targetField === 'voting option') {
      startAddingButton = cy.getByDataCy(DATA_CY_LIST_ADD)
    } else {
      throw new Error(`Target field ${targetField} not implemented!`)
    }
    startAddingButton.click()
  }

  enterTooShortTextToTargetInputField(targetField: 'poll question' | 'voting option') {
    this.clickProperAddTextModalOpen(targetField)
    let inputText = ''
    for (let i = 0; i < TEXT_LENGTH_QUESTION_MIN - 1; i++) {
      inputText += 'x'
    }
    this.typePollQuestionToInputField(inputText)
  }

  enterTooLongTextToTargetInputField(targetField: 'poll question' | 'voting option') {
    this.clickProperAddTextModalOpen(targetField)
    let inputText = ''
    for (let i = 0; i < TEXT_LENGTH_MAX + 1; i++) {
      inputText += 'x'
    }
    this.typePollQuestionToInputField(inputText)
  }

  giveSameVotingOptionTwice() {
    const nonUniqueOption = 'non unique'
    for (let i = 0; i < 2; i++) {
      this.clickProperAddTextModalOpen('voting option')
      this.typeVotingOptionToInputField(nonUniqueOption)
      this.clickModalAddButton()
    }
  }

  enterTextAndClearTextFromTargetInputField(targetField: 'poll question' | 'voting option') {
    this.clickProperAddTextModalOpen(targetField)
    cy.getByDataCy(DATA_CY_INPUT_MODAL).within(() => {
      const inputField = cy.getByDataCy(DATA_CY_MODAL_INPUT_TEXT)
      inputField.type('iii')
      inputField.clear()
    })
  }
}
