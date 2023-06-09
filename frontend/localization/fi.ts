import { VOTING_OPTIONS_MIN } from '../utils/constant-values'
import { Translations } from './translations'

export const FI_TRANSLATIONS: Translations = {
  app_title: 'DOTS',
  app_short_description: 'simppeli äänestäminen',
  how_does_it_work: 'MITEN SE TOIMII?',
  use_instruction_1: 'Joku luo äänestyksen.',
  use_instruction_2: 'Äänestys saa uniikin koodin.',
  use_instruction_3: 'Äänestyskoodi jaetaan osallistujille.',
  use_instruction_4: 'Osallistujat ottavat omat laitteensa.',
  use_instruction_5: 'Osallistujat tulevat tälle web-sivulle.',
  use_instruction_6: 'Kaikki äänestävät.',
  dashboard_info_1: 'Olet käyttänyt sovellusta ennenkin.',
  dashboard_info_2: 'Löydät äänestyksesi työpöydältä:',
  view_dashboard: 'työpöytä',
  mode_create_poll: 'luo uusi',
  mode_vote_in_poll: 'äänestä',
  language_FI: 'suomi',
  language_EN: 'englanti',
  navigation_route_launch_page: 'koti',
  navigation_route_create_poll: 'uusi',
  navigation_route_vote: 'äänestä',
  navigation_route_view_poll: 'tarkastele',
  navigation_route_dashboard: 'työpöytä',
  route_text_create_poll: 'luo äänestys',
  route_text_vote: 'äänestä',
  route_text_view_poll: 'tarkastele',
  route_text_dashboard: 'työpöytä',
  too_short: 'liian lyhyt',
  too_long: 'liian pitkä',
  required: 'pakollinen',
  too_many_options: 'Liian monta vaihtoehtoa',
  too_little_options: 'Lisää ainakin yksi...',
  options_must_be_unique: 'Vaihtoehtojen oltava uniikkeja!',
  set_min_voting_options: `ASETA MIN ${VOTING_OPTIONS_MIN} VAIHTOEHTOA`,
  add_voting_option_modal_title: 'Lisää vaihtoehto',
  placeholder_type_option_here: 'Kirjoita vaihtoehto tähän...',
  set_voting_question: 'MISTÄ ÄÄNESTETÄÄN?',
  add_voting_question_modal_title: 'Mistä äänestetään?',
  placeholder_type_question_here: 'Kirjoita aihe tähän...',
  max_votes_per_person_title: 'Max ääniä / hlö',
  mox_votes_per_option_title: 'Max ääniä / vaihtoehto / hlö',
  voting_is_anonymous: 'Anonyymi äänestys',
  show_status_when_voting: 'Näytä tilanne äänestettäessä',
  general_add: 'Lisää',
  general_reset: 'Tyhjennä',
  general_submit: 'Lähetä',
  at_time_of_day: 'klo',
  set_your_name: 'ANNA OMA NIMESI',
  set_your_name_modal_title: 'Anna oma (lempi)nimesi',
  placeholder_type_name_here: 'Kirjoita (lempi)nimesi tähän...',
  toast_default_error: 'VIRHE',
  toast_default_warning: 'VAROITUS',
  toast_default_success: 'ONNISTUI',
  toast_create_poll_error: 'Jokin meni pieleen. Äänestymistä ei pystytty luomaan. Yritä uudelleen.',
  toast_create_poll_success: 'Äänestys on nyt luotu!',
  option_count_cannot_exceed_total_count: 'liian suuri',
  toast_open_poll_error: 'Jokin meni pieleen. Äänestyksen avaaminen epäonnistui.',
  toast_open_poll_success: 'Äänestys avattiin onnistuneesti',
  toast_close_poll_error: 'Jokin meni pieleen. Äänestyksen sulkeminen epäonnistui.',
  toast_close_poll_success: 'Äänestys suljettiin onnistuneesti.',
  open_poll: 'Avaa',
  edit_poll: 'Muokkaa',
  leave_poll: 'Myöhemmin',
  close_poll: 'Lukitse',
  vote_in_poll: 'Äänestä',
  view_poll: 'Tarkastele',
  can_still_edit_poll: 'tee siihen joitakin muutoksia tai',
  open_poll_for_voting: 'avaa äänestys osallistujille tai',
  what_to_do_next: 'Mitä tehdä seuraavaksi?',
  come_back_later: 'palaa siihen myöhemmin uudelleen',
  close_poll_from_voting: 'sulje äänestys kokonaan tai',
  vote_in_poll_info: 'voit nyt äänestää tai',
  view_poll_info: 'voit tarkasella äänestyksen tuloksia',
  edit_poll_save_changes: 'Tallenna muutokset',
  toast_edit_poll_error: 'Jokin meni pieleen. Muutosten tallentaminen epäonnistui.',
  toast_edit_poll_success: 'Äänestyksen tiedot päivitettiin onnistuneesti.',
  toast_fetch_polls_by_id_or_code_error: 'Jokin meni pieleen. Äänestyksiä ei löytynyt.',
  enter_poll_code: 'Kirjoita alle äänestyksen koodi',
  go_to_poll: 'Äänestykseen',
  toast_fetch_poll_by_code_error: 'Jokin meni pieleen. Äänestystä ei löytynyt.',
  toast_give_vote_error: 'Jokin meni pieleen. Äänestäminen ei onnistunut.',
  vote_left: 'ääni jäljellä.',
  votes_left: 'ääntä jäljellä.',
  once_you_click: 'Kun klikkaat, et voi perua!',
  you_have: 'Sinulla on',
  you: 'Sinä',
  not_anonymous_info_1: 'Tämä äänestys ei ole anonyymi.',
  not_anonymous_info_2: 'Muut näkevät, miten äänestät.',
  not_anonymous_info_3: 'Ystävällisesti klikkaa ja anna nimesi.',
  enter_name: 'Anna nimi',
  could_not_find: 'Ei löytynyt',
  poll_with_code: 'äänestystä koodilla',
  something_went_wrong: 'Jokin meni pieleen.',
  go_home: 'Ystävällisesti mene aloitussivulle.',
  vote_this: 'tämä'
}
