import { useMessageStore } from '../stores/messageStore'
import { useEffect, useRef, useState } from 'react'
import { BodyScrollEvent, ColDef } from 'ag-grid-community'
import { FsdtServerMessage } from '@fullstack-devtool/core'
import styled from '@emotion/styled'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.min.css'
import { MdOutlineVerticalAlignBottom } from 'react-icons/md'

const cols: ColDef<FsdtServerMessage>[] = [
  { headerName: 'Source', field: 'source', width: 100 },
  {
    headerName: 'Content',
    field: 'data.content',
    cellRenderer: (params: { value: any }) => JSON.stringify(params.value),
    flex: 1,
  },
  { headerName: 'Time', field: 'data.timestamp' },
  { headerName: 'Level', field: 'data.level', width: 100 },
  { headerName: 'Tag', field: 'data.tag' },
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

export default function ListView() {
  const gridRef = useRef(null)
  const messages = useMessageStore((state) => state.messages)
  const [stickToBottom, setStickToBottom] = useState(true)

  useEffect(() => {
    if (gridRef.current && gridRef.current.api && stickToBottom) {
      requestAnimationFrame(() => {
        gridRef.current.api.ensureIndexVisible(messages.length - 1)
      })
    }
  }, [messages])

  const handleClick = () => {
    if (stickToBottom) {
      setStickToBottom(false)
    } else {
      setStickToBottom(true)
      gridRef.current.api.ensureIndexVisible(messages.length - 1)
    }
  }

  return (
    <>
      <StyledListRenderer className="ag-theme-material">
        <AgGridReact
          ref={gridRef}
          rowData={messages}
          columnDefs={cols}
          onBodyScroll={(event: BodyScrollEvent<any>) => {
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
          }}
          suppressScrollOnNewData
        />
      </StyledListRenderer>
      <StickToBottomButton active={stickToBottom} onClick={handleClick}>
        <MdOutlineVerticalAlignBottom size={24} />
      </StickToBottomButton>
    </>
  )
}
