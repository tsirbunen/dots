import { ThemeColor } from '../../../theme/theme'
import { TextShade } from './blinking-text'

export class Styles {
  static blinkingText(shade: TextShade) {
    return {
      color: shade === 'pale' ? ThemeColor.SHADE_1 : ThemeColor.SHADE_2,
      fontSize: '1em',
      fontWeight: 'bold'
    }
  }
}
