const theme = {
  COLORS: {
    MAIN: {
      PRIMARY: '#FF2D55',
      SECONDARY: '#FFD5DD',
    },
    LABEL: {
      PRIMARY: '#111111',
      SECONDARY: '#767676',
      TERTIARY: '#C4C4C6',
    },
    GRAY: {
      1: 'rgb(142, 142, 147)',
      2: 'rgb(174, 174, 178)',
      3: 'rgb(199, 199, 204)',
      4: 'rgb(209, 209, 214)',
      5: 'rgb(229, 229, 234)',
      6: 'rgb(242, 242, 247)',
    },
    RED: '#FF3B30',
    GREEN: '#34C759',
    BACKGROUND: '#F7F7FB',
  },
} as const;

export default theme;

export type Theme = typeof theme;
