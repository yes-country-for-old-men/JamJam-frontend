const theme = {
  COLORS: {
    JAMJAM_PRIMARY: {
      1: '#FF2D55',
      2: '#FFD5DD',
    },
    JAMJAM_SECONDARY: {
      1: '#FFCC00',
      2: '#FFF5CC',
    },
    LABEL_PRIMARY: '#111111',
    LABEL_SECONDARY: '#767676',
    LABEL_TERTIARY: '#C4C4C6',
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
