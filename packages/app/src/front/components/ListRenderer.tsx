import { AgGridReact } from 'ag-grid-react'
import { FsdtServerMessage } from '@fullstack-devtool/core'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.min.css'
import { ColDef } from 'ag-grid-community'
import styled from '@emotion/styled'

interface IProps {
  rowData: FsdtServerMessage[]
}

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

export default function ListRenderer({ rowData }: IProps) {
  return (
    <StyledListRenderer className="ag-theme-material">
      <AgGridReact rowData={rowData} columnDefs={cols} suppressScrollOnNewData />
    </StyledListRenderer>
  )
}
