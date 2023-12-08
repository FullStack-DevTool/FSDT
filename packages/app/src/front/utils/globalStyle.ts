import { Interpolation } from '@emotion/react'
import { theme, Theme } from '../theme'

export const globalStyle: Interpolation<Theme> = {
  body: {
    margin: 0,
  },
  '#app': {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  /*

  AG Grid

  */
  '.ag-header, .ag-header-row, .ag-header-cell': {
    minHeight: '0 !important',
    height: '0 !important',
    borderBottom: '0 !important',
  },

  /* Row */

  '.ag-row': {
    borderBottom: 'none',
  },

  '.ag-row::before,.ag-row-hover::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '5% !important',
    width: '90%',
    borderBottom: '1px solid #e8e8e8',
  },

  '.ag-row-selected': {
    borderTop: `1px solid ${theme.colors.activeBorder}`,
    borderBottom: `1px solid ${theme.colors.activeBorder}`,
  },

  '.ag-row-selected::before,.ag-row-hover.ag-row-selected::before': {
    backgroundColor: 'transparent',
    backgroundImage: 'none',
  },

  /* Cell */

  '.ag-cell': {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 'normal',
  },
}
