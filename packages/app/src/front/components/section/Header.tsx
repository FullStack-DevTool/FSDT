import styled from '@emotion/styled'
import { useApp } from '../../stores/useApp'
import { Any } from '@fullstack-devtool/core'
import { NavListViews } from '../NavListViews'
import FSDTLogo from '../../assets/images/Blue_rounded_fsdt.svg'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 40px;
  width: 100%;
  box-sizing: border-box;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.margin.small};
  padding: ${(props) => props.theme.margin.medium};
  flex: 1;
`

const Title = styled.span`
  font-size: ${(props) => props.theme.fontSize.small};
  font-family: ${(props) => props.theme.fontFamily.primary};
`

const ViewsListContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100%;
`

export default function Header() {
  const version = useApp((state) => state.version)

  // webkit-app-region: drag is used to make the window draggable
  return (
    <StyledHeader>
      <TitleContainer style={{ WebkitAppRegion: 'drag' } as Any}>
        <img src={FSDTLogo} alt="FullStack-Devtool Logo" width="32" />
        <Title>FullStack-Devtool Console v.{version}</Title>
      </TitleContainer>
      <ViewsListContainer>
        <NavListViews />
      </ViewsListContainer>
    </StyledHeader>
  )
}
