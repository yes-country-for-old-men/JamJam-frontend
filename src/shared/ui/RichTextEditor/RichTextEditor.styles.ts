import styled from '@emotion/styled';

export const EditorContainer = styled.div`
  position: relative;
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

export const LoadingSkeleton = styled.div<{ height: number }>`
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

export const SkeletonToolbar = styled.div`
  height: 48px;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 8px;
`;

export const SkeletonButton = styled.div`
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

export const SkeletonContent = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SkeletonLine = styled.div<{ width?: string }>`
  height: 16px;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 4px;
  width: ${(props) => props.width || '100%'};
  animation: pulse 1.5s ease-in-out infinite alternate;
`;
