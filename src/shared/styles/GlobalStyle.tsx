import { Global, css } from '@emotion/react';
import theme from '@/shared/styles/theme';

const globalStyles = css`
  @font-face {
    font-family: 'A2z';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-6@1.0/에이투지체-7Bold.woff2')
      format('woff2');
    font-weight: 700;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  input,
  textarea {
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    font-family:
      'Pretendard Variable',
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
    color: ${theme.COLORS.LABEL.PRIMARY};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.025em;
  }

  html,
  body {
    background-color: ${theme.COLORS.BACKGROUND};
    font-size: 16px;
    line-height: 1.5;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
  }

  #root {
    width: 100%;
    min-height: 100dvh;
  }
`;

export default function GlobalStyle() {
  return <Global styles={globalStyles} />;
}
