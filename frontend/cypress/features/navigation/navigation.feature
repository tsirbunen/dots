Feature: Navigation

    Navigating within the app

    Scenario: One can navigate to other pages from the launch page
        Given one has navigated to the DOTS app url
        When one clicks the "<use mode>" button
        Then one is taken to "<target page>"

        Examples:
            | use mode     | target page       |
            | create poll  | create-poll-page  |
            | vote in poll | vote-in-poll-page |



    Scenario: One can navigate to other pages using the hamburger menu
        Given one has navigated to the "<starting page>"
        When one clicks the hamburger menu button
        Then the navigation menu is open
        When one clicks the "<target route>" menu button
        Then one is taken to "<target page>"

        Examples:
            | starting page | target route | target page       |
            | create-poll   |              | launch-page       |
            | create-poll   | vote-in-poll | vote-in-poll-page |
            | create-poll   | dashboard    | dashboard-page    |
            | vote-in-poll  |              | launch-page       |
            | vote-in-poll  | create-poll  | create-poll-page  |
            | vote-in-poll  | dashboard    | dashboard-page    |
            | dashboard     |              | launch-page       |
            | dashboard     | vote-in-poll | vote-in-poll-page |
            | dashboard     | create-poll  | create-poll-page  |

