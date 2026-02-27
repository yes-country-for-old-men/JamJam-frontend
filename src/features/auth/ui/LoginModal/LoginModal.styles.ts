import styled from '@emotion/styled';

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 16px 0;
`;

export const FindLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const FindLink = styled.button`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Divider = styled.span`
  color: ${(props) => props.theme.COLORS.GRAY[2]};
  font-size: 13px;
`;

export const SignUpLink = styled.div`
  margin-top: 12px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;

  a {
    margin-left: 6px;
    color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 4px;
  color: ${(props) => props.theme.COLORS.RED};
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`;

export const ResultBox = styled.div`
  padding: 24px;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 12px;
  text-align: center;
  font-size: 15px;
`;

export const ResultId = styled.div`
  margin-top: 8px;
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
`;
