import { FsdtLogMessageContent } from '@fullstack-devtool/core'
import styled from '@emotion/styled'
import { ObjectView } from '../ObjectView'
import { StoredMessage } from '../../stores/messageStore'

type LogCellProps = {
  value: FsdtLogMessageContent
  data: StoredMessage
}

const StyledLogCell = styled.div`
  white-space: break-spaces;
  font-size: ${(props) => props.theme.fontSize.small};
  font-family: ${(props) => props.theme.fontFamily.secondary};
  * {
    font-family: ${(props) => props.theme.fontFamily.secondary};
  }
  display: flex;
  align-items: center;
`

const Quantity = styled.span`
  margin-left: 8px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 2px 4px;
  border-radius: 400px;
  font-size: 12px;
`

export const LogCell = ({ value, data }: LogCellProps) => {
  return (
    <StyledLogCell>
      {typeof value === 'object' ? <ObjectView value={value} /> : value}
      {data.quantity > 1 && <Quantity>{data.quantity}</Quantity>}
    </StyledLogCell>
  )
}
