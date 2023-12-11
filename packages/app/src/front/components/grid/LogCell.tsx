import { FsdtLogMessageContent } from '@fullstack-devtool/core'
import ReactJson from 'react-json-view'
import styled from '@emotion/styled'

type LogCellProps = {
  value: FsdtLogMessageContent
}

const StyledLogCell = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  * {
    font-family: 'Fira Code';
  }
`

export const LogCell = ({ value }: LogCellProps) => {
  return (
    <StyledLogCell>
      {typeof value === 'object' ? (
        <ReactJson
          src={value}
          displayObjectSize={false}
          displayDataTypes={false}
          quotesOnKeys={false}
          collapsed={1}
          name={null}
          iconStyle={'square'}
        />
      ) : (
        value
      )}
    </StyledLogCell>
  )
}
