import { Base } from './base'
import { DATA_CY_TEXT_INPUT_BUTTON } from '../../components/forms/form-inputs/text-input'
import { DATA_CY_INPUT_MODAL } from '../../components/forms/form-inputs/input-modal'
import { EN_TRANSLATIONS } from '../../localization/en'
import { DATA_CY_MODAL_ADD, DATA_CY_MODAL_INPUT_TEXT } from '../../components/forms/form-inputs/input-modal'
import { DATA_CY_DELETE_LIST_ITEM, DATA_CY_LIST_ADD } from '../../components/forms/form-inputs/text-list-input'
import { DATA_CY_RESET, DATA_CY_SUBMIT } from '../../components/forms/form-elements/poll-form'
import { TEXT_LENGTH_MAX, TEXT_LENGTH_QUESTION_MIN, VOTING_OPTIONS_MAX } from '../../utils/constant-values'
import { DATA_CY_TOAST_MESSAGE, DATA_CY_TOAST_TITLE } from '../../components/widgets/toast/toast'
import { Phrase } from '../../localization/translations'
import { DATA_CY_INFO_EDIT_POLL } from '../../components/dashboard/poll-available-actions/poll-available-actions'

export class CreatePollPage extends Base {
  verifySetPollQuestionModalVisibility(isVisible: boolean) {
    if (isVisible) {
      cy.getByDataCy(DATA_CY_INPUT_MODAL).within(() => {
        cy.contains(EN_TRANSLATIONS.add_voting_question_modal_title)
        this.verifyDataCyIsVisible(DATA_CY_MODAL_INPUT_TEXT)
        this.verifyDataCyIsVisible(DATA_CY_MODAL_ADD)
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

  typeUserNameToInputField(userName: string) {
    cy.getByDataCy(DATA_CY_INPUT_MODAL).within(() => {
      const inputField = cy.getByDataCy(DATA_CY_MODAL_INPUT_TEXT)
      inputField.type(userName)
    })
  }

  clickModalAddButton() {
    cy.getByDataCy(DATA_CY_INPUT_MODAL).within(() => {
      const addButton = cy.getByDataCy(DATA_CY_MODAL_ADD)
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
        this.verifyDataCyIsVisible(DATA_CY_MODAL_INPUT_TEXT)
        this.verifyDataCyIsVisible(DATA_CY_MODAL_ADD)
      })
    } else {
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
        dataCy = DATA_CY_RESET
        break
      case 'submit':
        dataCy = DATA_CY_SUBMIT
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
        this.verifyDataCyIsVisible(postfix)
        break
      case 'is not visible':
        this.verifyDataCyIsNotVisible(postfix)
        break
      case 'does not exist':
        this.verifyDataCyDoesNotExist(postfix)
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

  clickProperAddTextModalOpen(targetField: 'poll question' | 'voting option' | 'user name') {
    let startAddingButton
    if (targetField === 'poll question') {
      startAddingButton = cy.getByDataCy(`${DATA_CY_TEXT_INPUT_BUTTON}-question`)
    } else if (targetField === 'voting option') {
      startAddingButton = cy.getByDataCy(DATA_CY_LIST_ADD)
    } else if (targetField === 'user name') {
      startAddingButton = cy.getByDataCy(`${DATA_CY_TEXT_INPUT_BUTTON}-ownerName`)
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

  fillInAllRequiredFields() {
    this.clickProperAddTextModalOpen('user name')
    this.typePollQuestionToInputField('Some name')
    this.clickModalAddButton()
    this.clickProperAddTextModalOpen('poll question')
    this.typePollQuestionToInputField('Some question')
    this.clickModalAddButton()
    for (let i = 0; i < 2; i++) {
      this.clickProperAddTextModalOpen('voting option')
      this.typeVotingOptionToInputField(`option name ${i}`)
      this.clickModalAddButton()
    }
  }

  submitPollData() {
    const submitButton = cy.getByDataCy(DATA_CY_SUBMIT)
    submitButton.click()
  }

  verifySnackbarIsVisible(title: Phrase, message: Phrase) {
    cy.getByDataCy(DATA_CY_TOAST_TITLE).within(() => {
      cy.contains(EN_TRANSLATIONS[title])
    })

    cy.getByDataCy(DATA_CY_TOAST_MESSAGE).within(() => {
      cy.contains(EN_TRANSLATIONS[message])
    })
  }

  deleteFirstVotingOption(optionIndex: string) {
    const deletedIcon = cy.getByDataCy(`${DATA_CY_DELETE_LIST_ITEM}-${optionIndex}`)
    deletedIcon.click()
  }
}
