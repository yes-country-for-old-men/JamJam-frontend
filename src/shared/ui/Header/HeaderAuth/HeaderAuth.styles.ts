import styled from '@emotion/styled';

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

export const SignInButton = styled.button`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 12px;
  margin-right: 12px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export const SignUpButton = styled.button`
  display: flex;
  background-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  color: white;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 12px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;
