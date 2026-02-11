import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 10px;
  cursor: pointer;
  gap: 12px;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: scale(1.05);
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.06));
  }
`;

export const CategoryTitle = styled.span`
  text-align: center;
  font-weight: 600;
  line-height: 1.4;
  word-break: keep-all;
`;
