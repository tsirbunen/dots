Feature: Navigation

    Navigating within the app

    Scenario: One can navigate to other pages from the launch page
        Given one has navigated to the DOTS app url
        When one clicks the "<target route>" button
        Then one is taken to "<target page>"

        Examples:
            | target route | target page       |
            | create poll  | create-poll-page  |
            | vote in poll | vote-in-poll-page |
            | view poll    | view-poll-page    |



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
            | create-poll   | view-poll    | view-poll-page    |
            | vote-in-poll  |              | launch-page       |
            | vote-in-poll  | create-poll  | create-poll-page  |
            | vote-in-poll  | view-poll    | view-poll-page    |
            | view-poll     |              | launch-page       |
            | view-poll     | create-poll  | create-poll-page  |
            | view-poll     | vote-in-poll | vote-in-poll-page |

