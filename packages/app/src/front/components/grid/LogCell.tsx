import { FsdtLogMessageContent } from '@fullstack-devtool/core'
import styled from '@emotion/styled'
import { ObjectView } from '../ObjectView'

type LogCellProps = {
  value: FsdtLogMessageContent
}

const StyledLogCell = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  font-family: ${(props) => props.theme.fontFamily.secondary};
  * {
    font-family: ${(props) => props.theme.fontFamily.secondary};
  }
`

export const LogCell = ({ value }: LogCellProps) => {
  return <StyledLogCell>{typeof value === 'object' ? <ObjectView value={value} /> : value}</StyledLogCell>
}
