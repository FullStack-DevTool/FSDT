import styled from '@emotion/styled'
import { LogLevel, stringToColor } from '@fullstack-devtool/core'

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.margin.small};
  color: white;
  font-size: 0.8em;
`

const CellContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export function TagCell({ value }: { value: LogLevel }) {
  return (
    <CellContainer>
      <TagContainer style={{ backgroundColor: value ? stringToColor(value) : '' }}>{value}</TagContainer>
    </CellContainer>
  )
}
