Feature: Toggle language

    One changes app language on launch page

    Scenario: App language can be toggled on launch page
        Given one has navigated to the DOTS app url
        Then the app language is "<start language>"
        Then the language toggle buttons are invisible
        When one clicks the toggle language icon button
        Then the language toggle buttons are visible
        When one clicks the selection button with text <language>
        Then the app language is "<end language>"

        Examples:
            | start language | language | end language |
            | EN             | Finnish  | FI           |