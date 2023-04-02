Feature: Edit poll

    Edit a poll that has been created earlier

    Background:
        Given one has navigated to the "create-poll"
        Given one has created a poll and is in dashboard page for a single poll

    Scenario: One can edit the poll, submit the data and the changes are saved to database
        When one navigates to the poll using the edit button
        When one clicks the button to start setting the poll question
        When one enters the "changed question"
        When one clicks the add button in the modal
        When one clicks the button to start adding a voting option
        When one enters a "new voting option"
        When one clicks the add button in the modal
        When one clicks a delete button to remove option number 0
        When one clicks the button to submit poll data
        Then "success" snackbar containing words "poll successfully updated" is visible






