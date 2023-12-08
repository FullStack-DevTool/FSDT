import { FsdtLogMessageContent } from '@fullstack-devtool/core'
import ReactJson from 'react-json-view'

type LogCellProps = {
  value: FsdtLogMessageContent
}

export const LogCell = ({ value }: LogCellProps) => {
  return <div>{typeof value === 'object' ? <ReactJson src={value} collapsed /> : value}</div>
}
