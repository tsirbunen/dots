Feature: Create poll

    Fill in the create poll form and submit the data

    Background:
        Given one has navigated to the "create-poll"
        Given one has filled in the poll form some data

    Scenario: One can submit create poll data
        When one clicks the button to submit poll data
        Then poll form is no longer visible
        Then further editing poll button is visible
        Then open poll button is visible



