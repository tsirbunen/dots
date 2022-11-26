Feature: Launching the app

    One navigates to DOTS and the app launches with the Launch Page

    Scenario: Launch Page is the first visible page of the DOTS app
        Given one has navigated to the DOTS app url
        Then the app title is visible
        Then the app short description is visible
        Then the use instructions is visible
        Then the use mode selection buttons are visible
