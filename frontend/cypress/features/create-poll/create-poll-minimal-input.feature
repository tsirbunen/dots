Feature: Create poll

    Fill in the create poll form the minimal required data

    Background:
        Given one has navigated to the "create-poll"
        Then the create poll form is visible

    Scenario: One can fill in the poll question
        When one clicks the button to start setting the poll question
        Then a modal to enter the poll question is opened
        When one enters the "<poll question>"
        When one clicks the add button in the modal
        Then the entered "<poll question>" is visible in the form as the poll question
        Then the modal is no longer open

        Examples:
            | poll question  |
            | Which kitchen? |

    Scenario: One can fill in for example two voting options
        When one clicks the button to start adding a voting option
        Then a modal to enter a voting option is opened
        When one enters a "<first voting option>"
        When one clicks the add button in the modal
        Then the entered "<first voting option>" is visible in the form as a voting option
        Then the modal is no longer open
        When one clicks the button to start adding a voting option
        When one enters a "<second voting option>"
        When one clicks the add button in the modal
        Then the entered "<second voting option>" is visible in the form as a voting option


        Examples:
            | first voting option | second voting option |
            | Chinese             | Mexican              |



