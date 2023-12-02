import { useMessageStore } from '../stores/messageStore'
import { useSearchStore } from '../stores/searchStore'
import { useEffect, useRef, useState } from 'react'
import { BodyScrollEvent, ColDef, RowClassParams, RowStyle } from 'ag-grid-community'
import { Any, FsdtServerMessage } from '@fullstack-devtool/core'
import styled from '@emotion/styled'
import { AgGridReact } from 'ag-grid-react'

import { MdOutlineVerticalAlignBottom } from 'react-icons/md'
import { LogCell } from '../components/grid/LogCell'

const cols: ColDef<FsdtServerMessage>[] = [
  { headerName: 'Source', field: 'source', flex: 1, resizable: true },
  {
    headerName: 'Time',
    flex: 2,
    field: 'data.timestamp',
    resizable: true,
    getQuickFilterText: () => '',
    cellRenderer: ({ value }: { value: string }) => new Date(value).toLocaleTimeString(),
  },
  { headerName: 'Level', field: 'data.level', flex: 1, resizable: true },
  {
    headerName: 'Content',
    field: 'data.content',
    cellRenderer: LogCell,
    flex: 3,
    autoHeight: true,
    resizable: true,
  },
  { headerName: 'Tag', field: 'data.tag', flex: 1, resizable: true },
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

function rowStyle(params: RowClassParams<FsdtServerMessage>): RowStyle {
  switch (params.data.data.level) {
    case 'info':
      return { backgroundColor: '#ddf7fb' }
    case 'debug':
      return { backgroundColor: '#ececec' }
    case 'warn':
      return { backgroundColor: '#fef6d5' }
    case 'error':
      return { backgroundColor: '#fcebeb' }
  }
}

export default function ListView() {
  const gridRef = useRef(null)
  const messages = useMessageStore((state) => state.messages)
  const search = useSearchStore((state) => state.search)
  const [stickToBottom, setStickToBottom] = useState(true)

  useEffect(() => {
    if (gridRef.current && gridRef.current.api && stickToBottom) {
      requestAnimationFrame(() => {
        gridRef.current.api.ensureIndexVisible(messages.length - 1)
      })
    }
  }, [messages])

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

  return (
    <>
      <StyledListRenderer className="ag-theme-material">
        <AgGridReact
          ref={gridRef}
          rowData={messages}
          columnDefs={cols}
          getRowId={(params) => params.data.id}
          onBodyScroll={onBodyScroll}
          suppressScrollOnNewData
          getRowStyle={rowStyle}
        />
      </StyledListRenderer>
      <StickToBottomButton active={stickToBottom} onClick={handleClick}>
        <MdOutlineVerticalAlignBottom size={24} />
      </StickToBottomButton>
    </>
  )
}
