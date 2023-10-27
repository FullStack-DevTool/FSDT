import { useMessageStore } from '../stores/messageStore'
import { useEffect, useRef } from 'react'
import { ColDef } from 'ag-grid-community'
import { FsdtServerMessage } from '@fullstack-devtool/core'
import styled from '@emotion/styled'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.min.css'

const cols: ColDef<FsdtServerMessage>[] = [
  { headerName: 'Source', field: 'source', width: 100 },
  { headerName: 'Content', field: 'data.content', flex: 1 },
  { headerName: 'Time', field: 'data.timestamp' },
  { headerName: 'Level', field: 'data.level', width: 100 },
  { headerName: 'Tag', field: 'data.tag' },
]

const StyledListRenderer = styled.div`
  width: 100%;
  height: 100%;
`

export default function ListView() {
  const gridRef = useRef(null)
  const messages = useMessageStore((state) => state.messages)

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      console.log('gridRef.current.api', gridRef.current.api)
      gridRef.current.api.ensureIndexVisible(messages.length - 1)
    }
  }, [messages])

  return (
    <StyledListRenderer className="ag-theme-material">
      <AgGridReact ref={gridRef} rowData={messages} columnDefs={cols} suppressScrollOnNewData />
    </StyledListRenderer>
  )
}
