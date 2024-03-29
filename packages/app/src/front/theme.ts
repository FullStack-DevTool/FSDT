export const theme = {
  colors: {
    text: '#000000',
    secondaryText: '#7A7A7A',
    primary: '#3a4c9b',
    border: '#E6E6E6',
    activeBorder: '#3a4c9b',
    background: '#FFFFFF',
    hoverButton: 'rgba(69,164,251, 0.13)',
    selectedButton: 'rgba(69,164,251, 0.33)',
  },
  fontSize: {
    small: '14px',
    medium: '16px',
  },
  fontFamily: {
    title: 'Lexend Deca',
    primary: 'sans-serif',
    secondary: 'Fira Code',
  },
  fontWeight: {
    title: 700,
    normal: 400,
  },
  margin: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
}

export type Theme = typeof theme
