import { LogLevel } from '@fullstack-devtool/core'
import { levelOptions } from '../../utils/levelOptions'

export function LevelCell({ value }: { value: LogLevel }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {levelOptions.find((option) => option.value === value)?.logo}
    </div>
  )
}
