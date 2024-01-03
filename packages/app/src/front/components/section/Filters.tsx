import styled from '@emotion/styled'
import { SearchBar } from '../form/SearchBar'
import { MultipleSelect } from '../form/MultipleSelect'
import { useFilters } from '../../stores/useFilters'
import { useMessageStore } from '../../stores/messageStore'
import { useMemo } from 'react'
import { levelOptions } from '../../utils/levelOptions'

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.margin.small} ${(props) => props.theme.margin.medium};
  border-top: 1px solid ${(props) => props.theme.colors.border};
`

const SearchContainer = styled.div`
  flex: 3;
`

const SelectContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const SelectWrapper = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.border};
  padding-left: ${(props) => props.theme.margin.medium};
  padding-right: ${(props) => props.theme.margin.medium};
`

export function Filters() {
  const { selectedLevels, toggleLevel, selectedSources, toggleSource, search, setSearch, selectedTags, toggleTag } =
    useFilters((state) => ({
      selectedLevels: state.selectedLevels,
      toggleLevel: state.toggleLevel,
      selectedSources: state.selectedSources,
      toggleSource: state.toggleSource,
      search: state.search,
      setSearch: state.setSearch,
      selectedTags: state.selectedTags,
      toggleTag: state.toggleTag,
    }))
  const sources = useMessageStore((state) => state.sources)
  const tags = useMessageStore((state) => state.tags)

  const sourceOptions = useMemo(() => {
    return sources.map((source) => ({
      label: source,
      value: source,
    }))
  }, [sources])

  const tagOptions = useMemo(() => {
    return tags.map((tag) => ({
      label: tag,
      value: tag,
    }))
  }, [tags])

  return (
    <Container>
      <SearchContainer>
        <SearchBar search={search} onChange={setSearch} />
      </SearchContainer>
      <SelectContainer>
        <SelectWrapper>
          <MultipleSelect
            label={'Levels'}
            options={levelOptions}
            values={selectedLevels}
            valuesAsLabel
            onChange={toggleLevel}
            style={{ width: '130px', height: '30px' }}
          />
        </SelectWrapper>
        <SelectWrapper>
          <MultipleSelect label="Sources" options={sourceOptions} values={selectedSources} onChange={toggleSource} />
        </SelectWrapper>
        <SelectWrapper>
          <MultipleSelect label="Tags" options={tagOptions} values={selectedTags} onChange={toggleTag} />
        </SelectWrapper>
      </SelectContainer>
    </Container>
  )
}
