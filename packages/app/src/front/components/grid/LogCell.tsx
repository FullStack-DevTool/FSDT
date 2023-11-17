import styled from '@emotion/styled'
import { FsdtLogMessageContent } from '@fullstack-devtool/core'
import ReactJson from 'react-json-view'

type LogCellProps = {
  value: FsdtLogMessageContent
}

const StyledDiv = styled.div`
  padding: 8px;
`

export const LogCell = ({ value }: LogCellProps) => {
  return (
    <StyledDiv>
      <ReactJson src={value} collapsed />
    </StyledDiv>
  )
}
