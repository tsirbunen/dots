import { VOTING_OPTIONS_MIN } from '../utils/constant-values'
import { Translations } from './translations'

export const EN_TRANSLATIONS: Translations = {
  app_title: 'DOTS',
  app_short_description: 'simple dot voting',
  how_does_it_work: 'HOW DOES IT WORK?',
  use_instruction_1: 'Someone creates a new poll.',
  use_instruction_2: 'That poll gets a unique code.',
  use_instruction_3: 'The code is given to all voters.',
  use_instruction_4: 'Voters get their own devices out.',
  use_instruction_5: 'Voters navigate to this web page.',
  use_instruction_6: 'Voters vote in the poll.',
  dashboard_info_1: 'Seems you have used this app earlier.',
  dashboard_info_2: 'You can view your polls on dashboard:',
  view_dashboard: 'dashboard',
  mode_create_poll: 'create a poll',
  mode_vote_in_poll: 'vote in a poll',
  language_FI: 'Finnish',
  language_EN: 'English',
  navigation_route_launch_page: 'home',
  navigation_route_create_poll: 'create',
  navigation_route_vote: 'vote',
  navigation_route_view_poll: 'view',
  navigation_route_dashboard: 'dashboard',
  route_text_create_poll: 'create a poll',
  route_text_vote: 'vote in a poll',
  route_text_view_poll: 'view a poll',
  route_text_dashboard: 'dashboard',
  too_short: 'too short',
  too_long: 'too long',
  required: 'required',
  too_many_options: 'Too many options...',
  too_little_options: 'Add at least one more...',
  options_must_be_unique: 'Voting options must be unique!',
  set_min_voting_options: `SET MIN ${VOTING_OPTIONS_MIN} VOTING OPTIONS`,
  add_voting_option_modal_title: 'Add voting option',
  placeholder_type_option_here: 'Type the voting option here...',
  set_voting_question: 'SET VOTING QUESTION',
  add_voting_question_modal_title: 'Set voting question',
  placeholder_type_question_here: 'Type the question here...',
  max_votes_per_person_title: 'Max total votes / person',
  mox_votes_per_option_title: 'Max votes / option / person',
  voting_is_anonymous: 'Voting is anonymous',
  show_status_when_voting: 'Poll status is shown when voting',
  general_add: 'Add',
  general_reset: 'Reset',
  general_submit: 'Submit',
  at_time_of_day: 'at',
  set_your_name: 'SET YOUR NAME',
  set_your_name_modal_title: 'Set your name or nickname',
  placeholder_type_name_here: 'Type your name here...',
  toast_default_error: 'ERROR',
  toast_default_warning: 'WARNING',
  toast_default_success: 'SUCCESS',
  toast_create_poll_error: 'Something went wrong. Could not create the poll. Please try again.',
  toast_create_poll_success: 'Your poll was successfully created!',
  option_count_cannot_exceed_total_count: 'too big',
  toast_open_poll_error: 'Something went wrong. Could not open poll. Please try again.',
  toast_open_poll_success: 'Successfully opened poll for voting.',
  toast_close_poll_error: 'Something went wrong. Could not close poll. Please try again.',
  toast_close_poll_success: 'Successfully closed poll from voting.',
  open_poll: 'Open poll',
  edit_poll: 'Edit poll',
  leave_poll: 'Later',
  vote_in_poll: 'Vote in poll',
  view_poll: 'View poll',
  close_poll: 'Close poll',
  can_still_edit_poll: 'Or edit the poll a bit further',
  open_poll_for_voting: 'Open the poll for voting',
  what_to_do_next: 'What to do next with poll',
  come_back_later: 'Or just come back to it later',
  close_poll_from_voting: 'Or you can close the poll from voting',
  vote_in_poll_info: 'You can now vote in the poll',
  edit_poll_save_changes: 'Save changes',
  view_poll_info: 'You can view poll results',
  toast_edit_poll_error: 'Something went wrong. Could not save changes poll. Please try again.',
  toast_edit_poll_success: 'You poll was successfully updated.',
  toast_fetch_polls_by_id_or_code_error: 'Something went wrong. Could not find polls.',
  enter_poll_code: 'Please type a poll code below',
  go_to_poll: 'Go to poll',
  toast_fetch_poll_by_code_error: 'Something went wrong. Could not find poll. Please try again.',
  toast_give_vote_error: 'Something went wrong. Could not vote. Please try again.',
  vote_left: 'vote left.',
  votes_left: 'votes left.',
  once_you_click: 'Once you click you cannot cancel!',
  you_have: 'You have',
  you: 'You',
  not_anonymous_info_1: 'This poll is not anonymous.',
  not_anonymous_info_2: 'Others will see how you voted.',
  not_anonymous_info_3: 'Please click to enter your name.',
  enter_name: 'Enter name',
  could_not_find: 'Could not find',
  poll_with_code: 'poll with code',
  something_went_wrong: 'Something went wrong.',
  go_home: 'Please navigate to starting page.',
  vote_this: 'vote'
}
