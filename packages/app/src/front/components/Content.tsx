import styled from '@emotion/styled'
import { useSearchStore } from '../stores/searchStore'
import { useViewFilterStore } from '../stores/viewFilterStore'
import ListView from '../views/ListView'
import ColumnView from '../views/ColumnView'
import AccordionView from '../views/AccordionView'

const StyledContent = styled.main`
  flex: 1;
  padding: 8px;
`

export default function Content() {
  const search = useSearchStore((state) => state.search)
  const view = useViewFilterStore((state) => state.view)
  const source = useViewFilterStore((state) => state.source)
  const tag = useViewFilterStore((state) => state.tag)

  const renderView = () => {
    switch (view) {
      case 'List':
        return <ListView />
      case 'Column':
        return <ColumnView />
      case 'Accordion':
        return <AccordionView />
    }
  }

  return <StyledContent>{renderView()}</StyledContent>
}
