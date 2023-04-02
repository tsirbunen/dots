Feature: Create poll form validation

    Validation of create poll form data

    Background:
        Given one has navigated to the "create-poll"
        Then the create poll form is visible

    Scenario: To start with, the poll question and voting options are missing, warranting warnings
        Then info on a missing poll question is displayed
        Then info on a missing poll question is displayed
        Then info on missing voting options is displayed
        Then reset button "is disabled"
        Then submit button "is disabled"


    Scenario: After adding one voting option, warning is displayed that at least another is required
        When one clicks the button to start adding a voting option
        Then a modal to enter a voting option is opened
        When one enters a "voting option"
        When one clicks the add button in the modal
        Then warning that at least one more voting option is required is displayed
        Then submit button "is disabled"


    Scenario: When max allowed count of voting options has been added, adding more is disabled
        Given one has added max allowed number of voting options
        Then the add voting option button is disabled


    Scenario: Warning is given if voting options are not unique
        Given one has added some voting option twice
        Then a warning is displayed that voting options must be unique
        Then submit button "is disabled"


    Scenario: When setting poll question, warning is given in case text length is too short
        Given one has typed "too short" text to "poll question" input field
        Then a warning is displayed that the input is "too short"
        Then "modal add" button "does not exist"
        Then submit button "is disabled"


    Scenario: When setting poll question, warning is given in case text length is too long
        Given one has typed "too long" text to "poll question" input field
        Then a warning is displayed that the input is "too long"
        Then "modal add" button "does not exist"
        Then submit button "is disabled"


    Scenario: When setting poll question, warning is given in case text is completely missing
        Given one has cleared the text from "poll question" input field
        Then a warning is displayed that the input is "required"
        Then "modal add" button "does not exist"
        Then submit button "is disabled"


    Scenario: When setting voting option, warning is given in case text length is too long
        Given one has typed "too long" text to "voting option" input field
        Then a warning is displayed that the input is "too long"
        Then "modal add" button "does not exist"
        Then submit button "is disabled"


    Scenario: When setting a voting option, warning is given in case text is completely missing
        Given one has cleared the text from "voting option" input field
        Then a warning is displayed that the input is "required"
        Then "modal add" button "does not exist"
        Then submit button "is disabled"