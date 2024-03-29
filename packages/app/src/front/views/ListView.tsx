import { useMessageStore } from '../stores/messageStore'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BodyScrollEvent, CellClickedEvent, ColDef } from 'ag-grid-community'
import { Any, FsdtServerMessage } from '@fullstack-devtool/core'
import styled from '@emotion/styled'
import { AgGridReact } from 'ag-grid-react'
import { MdOutlineVerticalAlignBottom } from 'react-icons/md'
import { LogCell } from '../components/grid/LogCell'
import { useFilters } from '../stores/useFilters'
import { LevelCell } from '../components/grid/LevelCell'
import { TagCell } from '../components/grid/TagCell'

const cols: ColDef<FsdtServerMessage>[] = [
  {
    field: 'data.level',
    width: 30,
    cellRenderer: LevelCell,
  },
  {
    field: 'data.content',
    flex: 1,
    cellRenderer: LogCell,
    autoHeight: true,
    resizable: true,
    filterValueGetter: (params) => {
      if (typeof params.data === 'object') {
        return JSON.stringify(params.data.data)
      }
      return params
    },
  },
  { field: 'source', width: 100, resizable: true, getQuickFilterText: () => '' },
  {
    field: 'data.timestamp',
    width: 100,
    resizable: true,
    getQuickFilterText: () => '',
    cellRenderer: ({ value }: { value: string }) => new Date(value).toLocaleTimeString(),
  },
  { field: 'data.tag', width: 120, resizable: true, cellRenderer: TagCell },
]

const StyledListRenderer = styled.div`
  width: 100%;
  height: 100%;
`

const StickToBottomButton = styled.button<{ active: boolean }>`
  position: absolute;
  bottom: 12px;
  right: 28px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  opacity: 0.4;
  border-style: solid;
  transition-duration: 0.2s;
  cursor: pointer;
  color: ${({ active }) => (active ? '#f00' : '#000')};

  &:hover {
    opacity: 0.8;
  }
`

// function rowStyle(params: RowClassParams<FsdtServerMessage>): RowStyle {
//   switch (params.data.data.level) {
//     case 'info':
//       return { backgroundColor: '#ddf7fb' }
//     case 'debug':
//       return { backgroundColor: '#ececec' }
//     case 'warn':
//       return { backgroundColor: '#fef6d5' }
//     case 'error':
//       return { backgroundColor: '#fcebeb' }
//   }
// }

export default function ListView() {
  const gridRef = useRef(null)
  const [stickToBottom, setStickToBottom] = useState(true)
  const messages = useMessageStore((state) => state.messages)
  const { selectedLevels, search, selectedSources, selectedTags } = useFilters((state) => ({
    selectedLevels: state.selectedLevels,
    search: state.search,
    selectedSources: state.selectedSources,
    selectedTags: state.selectedTags,
  }))

  const filteredMessages = useMemo(() => {
    let _messages = messages.filter((message) => selectedLevels.includes(message.data.level))

    if (selectedSources.length) {
      _messages = _messages.filter((message) => selectedSources.includes(message.source))
    }

    if (selectedTags.length) {
      _messages = _messages.filter((message) => selectedTags.includes(message.data.tag))
    }

    return _messages
  }, [messages, selectedLevels, selectedTags, selectedSources])

  useEffect(() => {
    if (gridRef.current && gridRef.current.api && stickToBottom) {
      requestAnimationFrame(() => {
        gridRef.current.api.ensureIndexVisible(filteredMessages.length - 1)
      })
    }
  }, [filteredMessages])

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.setQuickFilter(search)
    }
  }, [search])

  const handleClick = () => {
    if (stickToBottom) {
      setStickToBottom(false)
    } else {
      setStickToBottom(true)
      gridRef.current.api.ensureIndexVisible(messages.length - 1)
    }
  }

  const onBodyScroll = (event: BodyScrollEvent<Any>) => {
    if (
      event.top + document.querySelector<HTMLElement>('.ag-body').offsetHeight ===
        parseInt(document.querySelector<HTMLElement>('.ag-center-cols-viewport').style.height) ||
      event.top + document.querySelector<HTMLElement>('.ag-body').offsetHeight >=
        parseInt(document.querySelector<HTMLElement>('.ag-center-cols-viewport').style.height)
    ) {
      setStickToBottom(true)
    } else {
      setStickToBottom(false)
    }
  }

  const onCellClicked = (event: CellClickedEvent) => {
    if (event.colDef.field === 'data.content') {
      setStickToBottom(false)
    }
  }

  return (
    <>
      <StyledListRenderer className="ag-theme-material">
        <AgGridReact
          ref={gridRef}
          rowData={filteredMessages}
          columnDefs={cols}
          getRowId={(params) => params.data.id}
          onBodyScroll={onBodyScroll}
          suppressScrollOnNewData
          suppressHorizontalScroll
          suppressCellFocus
          // getRowStyle={rowStyle}
          rowSelection="single"
          gridOptions={{
            rowHeight: 45,
          }}
          onCellClicked={onCellClicked}
          /*getRowStyle={rowStyle}*/
        />
      </StyledListRenderer>
      <StickToBottomButton active={stickToBottom} onClick={handleClick}>
        <MdOutlineVerticalAlignBottom size={24} />
      </StickToBottomButton>
    </>
  )
}
