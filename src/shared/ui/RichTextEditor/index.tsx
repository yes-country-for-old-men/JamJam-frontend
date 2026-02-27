import React, { useRef, useState } from 'react';
import { Editor } from '@hugerte/hugerte-react';
import * as S from './RichTextEditor.styles';

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
    <S.LoadingSkeleton height={height}>
      <S.SkeletonToolbar>
        {Array.from({ length: 8 }, (_, index) => (
          <S.SkeletonButton key={index} />
        ))}
      </S.SkeletonToolbar>
      <S.SkeletonContent>
        {['60%', '80%', '40%', '90%', '70%'].map((width, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <S.SkeletonLine key={index} width={width} />
        ))}
      </S.SkeletonContent>
    </S.LoadingSkeleton>
  );

  return (
    <S.EditorContainer>
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
    </S.EditorContainer>
  );
};

export default RichTextEditor;
