import { Text } from '@chakra-ui/react'
import { Option } from '../../../types/types'
import { Styles } from './styles'

type PollDataTableProps = {
  pollCode: string
  pollOptions: Option[]
}

export const PollDataTable = ({ pollCode, pollOptions }: PollDataTableProps) => {
  const tableCell = (text: string, style: Record<string, string>) => {
    return (
      <td>
        <Text {...style}>{text}</Text>
      </td>
    )
  }

  return (
    <table>
      <tbody>
        <tr style={{ marginBottom: '5px' }}>
          {tableCell('code', Styles.codeName)}
          {tableCell(pollCode, Styles.codeValue)}
        </tr>
        {pollOptions.map((option, index) => {
          const textLeft = index === 0 ? 'options' : ' '
          return (
            <tr key={option.id}>
              {tableCell(textLeft, Styles.optionName)}
              {tableCell(`- ${option.content}`, Styles.optionValue)}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
