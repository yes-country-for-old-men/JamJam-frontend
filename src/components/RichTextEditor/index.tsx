import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Editor } from '@hugerte/hugerte-react';

interface HugeRTEEditor {
  getDoc(): Document;
  getContent(options?: { format?: string }): string;
  setContent(content: string): void;
  on(event: string, callback: () => void): void;
}

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  disabled?: boolean;
}

const FONT_FAMILY =
  "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif";
const LETTER_SPACING = '-0.025em';

const EditorContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;

  .tox-hugerte {
    border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
    border-radius: 12px;
    overflow: hidden;
  }

  .tox-editor-header {
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]} !important;
    box-shadow: none !important;
  }

  .tox-edit-area,
  .tox-edit-area__iframe {
    border: none;
  }

  .tox-edit-area__iframe {
    border-radius: 0 0 12px 12px;
  }
`;

const LoadingSkeleton = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${(props) => props.height}px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.COLORS.GRAY[6]} 25%,
    ${(props) => props.theme.COLORS.GRAY[5]} 50%,
    ${(props) => props.theme.COLORS.GRAY[6]} 75%
  );
  background-size: 200% 100%;
  border-radius: 12px;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const SkeletonToolbar = styled.div`
  height: 48px;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 8px;
`;

const SkeletonButton = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite alternate;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
`;

const SkeletonContent = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SkeletonLine = styled.div<{ width?: string }>`
  height: 16px;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 4px;
  width: ${(props) => props.width || '100%'};
  animation: pulse 1.5s ease-in-out infinite alternate;
`;

const createEditorConfig = (height: number) => ({
  height,
  language: 'ko_KR',
  language_url: '/hugerte-lang-kr.js',
  menubar: false,
  plugins: 'lists advlist',
  toolbar:
    'blocks | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
  lists_indent_on_tab: true,
  contextmenu: 'lists',
  content_css: [
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
  ],
  content_style: `
    body { 
      font-family: ${FONT_FAMILY} !important;
      font-size: 14px !important;
      padding: 0 16px !important;
      margin: 0 !important;
      line-height: 1.5 !important;
      letter-spacing: ${LETTER_SPACING} !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
    }
    
    * {
      font-family: ${FONT_FAMILY} !important;
      letter-spacing: ${LETTER_SPACING} !important;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-weight: 600 !important;
      margin: 16px 0 8px 0 !important;
    }
    
    h1 { font-size: 24px !important; }
    h2 { font-size: 20px !important; }
    h3 { font-size: 18px !important; }
    h4 { font-size: 16px !important; }
    h5 { font-size: 14px !important; }
    h6 { font-size: 13px !important; }
    
    p {
      margin: 8px 0 !important;
      line-height: 1.6 !important;
    }
    
    ul, ol {
      margin: 8px 0 !important;
      padding-left: 20px !important;
    }
    
    li {
      margin: 4px 0 !important;
      line-height: 1.5 !important;
    }
    
    strong, b { font-weight: 600 !important; }
    em, i { font-style: italic !important; }
  `,
  branding: false,
  elementpath: false,
  statusbar: false,
  highlight_on_focus: false,
  font_family_formats:
    'Pretendard=Pretendard Variable,Pretendard,-apple-system,BlinkMacSystemFont,system-ui,Roboto,sans-serif; Arial=arial,helvetica,sans-serif; Georgia=georgia,palatino,serif; Times New Roman=times new roman,times,serif; Verdana=verdana,geneva,sans-serif',
});

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  height = 540,
  disabled = false,
}) => {
  const editorRef = useRef<HugeRTEEditor | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const editorConfig = {
    ...createEditorConfig(height),
    setup: (editor: HugeRTEEditor) => {
      editorRef.current = editor;

      editor.on('init', () => {
        setIsEditorReady(true);

        const doc = editor.getDoc();
        if (doc?.body) {
          doc.body.style.fontFamily = FONT_FAMILY;
          doc.body.style.letterSpacing = LETTER_SPACING;
          doc.body.style.lineHeight = '1.5';
        }
      });
    },
  };

  const renderLoadingSkeleton = () => (
    <LoadingSkeleton height={height}>
      <SkeletonToolbar>
        {Array.from({ length: 8 }, (_, index) => (
          <SkeletonButton key={index} />
        ))}
      </SkeletonToolbar>
      <SkeletonContent>
        {['60%', '80%', '40%', '90%', '70%'].map((width, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SkeletonLine key={index} width={width} />
        ))}
      </SkeletonContent>
    </LoadingSkeleton>
  );

  return (
    <EditorContainer>
      {!isEditorReady && renderLoadingSkeleton()}
      <div
        style={{
          opacity: isEditorReady ? 1 : 0,
          position: isEditorReady ? 'static' : 'absolute',
          visibility: isEditorReady ? 'visible' : 'hidden',
        }}
      >
        <Editor
          value={value}
          onEditorChange={onChange}
          init={editorConfig}
          disabled={disabled}
        />
      </div>
    </EditorContainer>
  );
};

export default RichTextEditor;
