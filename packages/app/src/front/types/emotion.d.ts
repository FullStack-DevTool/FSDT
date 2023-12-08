import '@emotion/react'
import { Theme as LibTheme } from '../theme'

declare module '@emotion/react' {
  export interface Theme extends LibTheme {}
}
