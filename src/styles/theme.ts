const theme = {
  COLORS: {
    JAMJAM_PRIMARY: '#FF2D55',
    LABEL_PRIMARY: '#111111',
    LABEL_SECONDARY: '#767676',
    GRAY: {
      1: 'rgb(142, 142, 147)',
      2: 'rgb(174, 174, 178)',
      3: 'rgb(199, 199, 204)',
      4: 'rgb(209, 209, 214)',
      5: 'rgb(229, 229, 234)',
      6: 'rgb(242, 242, 247)',
    },
  },
} as const;

export default theme;

export type Theme = typeof theme;
