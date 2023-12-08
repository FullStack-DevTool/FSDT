import { FsdtLogMessageContent } from '@fullstack-devtool/core'
import ReactJson from 'react-json-view'

type LogCellProps = {
  value: FsdtLogMessageContent
}

export const LogCell = ({ value }: LogCellProps) => {
  return <div>{typeof value === 'object' ? (
    <ReactJson
      src={value}
      displayObjectSize={false}
      displayDataTypes={false}
      quotesOnKeys={false}
      collapsed={1}
      name={null}
      iconStyle={'square'}
    />
  ) : (
    value
  )}</div>
}
