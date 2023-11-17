import { css, Global } from '@emotion/react'

export const GlobalStyles = () => (
  <Global
    styles={css`
      .ag-cell {
        line-height: normal !important;
      }
    `}
  />
)
