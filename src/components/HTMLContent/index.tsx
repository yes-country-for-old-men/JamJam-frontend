import React from 'react';
import styled from '@emotion/styled';

interface HTMLContentProps {
  content: string;
  className?: string;
}

const StyledHTMLContent = styled.div`
  position: relative;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    margin: 16px 0 8px 0;
  }

  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }
  h4 {
    font-size: 16px;
  }
  h5 {
    font-size: 14px;
  }
  h6 {
    font-size: 13px;
  }

  p {
    line-height: 1.6;
    margin: 8px 0;
  }

  ul,
  ol {
    padding-left: 20px;
    margin: 8px 0;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  ul ul {
    list-style-type: circle;
  }

  ul ul ul {
    list-style-type: square;
  }

  ol ol {
    list-style-type: lower-alpha;
  }

  ol ol ol {
    list-style-type: lower-roman;
  }

  li {
    display: list-item;
    line-height: 1.5;
    margin: 4px 0;
  }

  strong,
  b {
    font-weight: 600;
  }

  em,
  i {
    font-style: italic;
  }

  blockquote {
    background-color: ${(props) => props.theme.COLORS.GRAY[6]};
    border-left: 3px solid ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
    font-style: italic;
    margin: 16px 0;
    padding: 12px 16px;

    p {
      margin: 0;
    }
  }

  a {
    color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
  }

  table,
  th,
  td {
    border: 1px solid ${(props) => props.theme.COLORS.GRAY[4]};
  }

  th,
  td {
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background-color: ${(props) => props.theme.COLORS.GRAY[6]};
    font-weight: 600;
  }

  code {
    background-color: ${(props) => props.theme.COLORS.GRAY[6]};
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    padding: 2px 4px;
    border-radius: 4px;
  }

  pre {
    background-color: ${(props) => props.theme.COLORS.GRAY[6]};
    border-radius: 8px;
    overflow-x: auto;
    padding: 16px;
    margin: 16px 0;

    code {
      background: none;
      padding: 0;
    }
  }
`;

const HTMLContent: React.FC<HTMLContentProps> = ({ content, className }) => {
  return (
    <StyledHTMLContent
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HTMLContent;
