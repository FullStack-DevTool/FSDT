import { css } from '@emotion/react'
import { theme } from '../theme'

export const globalStyleCss = css`
  * {
    font-family: ${theme.fontFamily.primary};
  }
  body {
    margin: 0;
  }
  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  /*

  AG Grid

  */
  .ag-header,
  .ag-header-row,
  .ag-header-cell {
    min-height: 0 !important;
    height: 0 !important;
    border-bottom: 0 !important;
  }

  /* Row */

  .ag-row {
    border-bottom: none;
  }

  .ag-row::before,
  .ag-row-hover::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5% !important;
    width: 90%;
    border-bottom: 1px solid #e8e8e8;
  }

  .ag-row-selected {
    border-top: 1px solid ${theme.colors.activeBorder};
    border-bottom: 1px solid ${theme.colors.activeBorder};
  }

  .ag-row-selected::before,
  .ag-row-hover.ag-row-selected::before {
    background-color: transparent;
    background-image: none;
  }

  .ag-cell {
    display: flex;
    align-items: center;
    line-height: normal;
  }

  @font-face {
    font-family: 'Fira Code';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/FiraCode-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/LexendDeca-Bold.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Lexend';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/Lexend-Regular.woff2') format('woff2');
  }
`
