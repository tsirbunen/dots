import { Phrase } from '../../../localization/translations'

export type TimeOfDay = { hours: number; minutes: number }

export enum TextDateTimeDataType {
  PLAIN_TEXT = 'plain text',
  DATE_TIME = 'date and / or time'
}

export class TextDateTimeDataHolder {
  private _text: string | undefined
  private _date: Date | undefined
  private _time: TimeOfDay | undefined
  private _dataType: TextDateTimeDataType

  constructor(
    plainText: string | undefined,
    date: Date | undefined,
    time: TimeOfDay | undefined,
    dataType: TextDateTimeDataType
  ) {
    this._text = plainText
    this._date = date
    this._time = time
    this._dataType = dataType
  }

  get text() {
    return this._text
  }

  get date() {
    return this._date
  }

  get time() {
    return this._time
  }

  get dataType() {
    return this._dataType
  }

  formatData(translate: (phrase: Phrase) => string) {
    let stringBuilder = ''
    if (this._date) stringBuilder += this._date.toDateString()
    if (this._time) stringBuilder += translate('at_time_of_day') + this._time
    if (this._text) stringBuilder += this._text
    return stringBuilder.trim()
  }

  is_equal_to(other: unknown) {
    if (other instanceof TextDateTimeDataHolder) {
      return (
        this.text === other.text &&
        this.date?.toString() === other.date?.toString() &&
        this.time?.toString() === other.time?.toString() &&
        this.dataType.toString() === other.dataType.toString()
      )
    }
    return false
  }
}
