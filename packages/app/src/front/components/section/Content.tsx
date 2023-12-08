import styled from '@emotion/styled'
import { useViewFilterStore } from '../../stores/viewFilterStore'
import ListView from '../../views/ListView'

const StyledContent = styled.main`
  flex: 1;
`

export default function Content() {
  const view = useViewFilterStore((state) => state.view)

  const renderView = () => {
    switch (view) {
      case 'List':
        return <ListView />
    }
  }

  return <StyledContent>{renderView()}</StyledContent>
}
