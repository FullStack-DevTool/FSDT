import {ReactNode} from "react";
import styled from '@emotion/styled'

const Container = styled.div`
  height: 100vh;
  display: flex;
 `

export default function AppContainer({children}: {children: ReactNode}) {
  return <Container>
    {children}
  </Container>;
}
