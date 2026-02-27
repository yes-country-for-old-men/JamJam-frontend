import styled from '@emotion/styled';

export const Container = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  aspect-ratio: 5/4;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 16px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.MAIN.SECONDARY};
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
    transform: translateY(-4px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 54px;
  height: 54px;

  & svg {
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.06));
  }
`;

export const CategoryName = styled.span`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
  word-break: keep-all;
`;
