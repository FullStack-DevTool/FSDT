import styled from '@emotion/styled'
import ListView from '../../views/ListView'
import { useViews } from '../../stores/useViews'

const StyledContent = styled.main`
  flex: 1;
`

export default function Content() {
  const view = useViews((state) => state.view)

  const renderView = () => {
    switch (view) {
      case 'List':
        return <ListView />
    }
  }

  return <StyledContent>{renderView()}</StyledContent>
}
