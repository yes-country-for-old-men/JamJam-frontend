import React, { useState } from 'react';
import styled from '@emotion/styled';
import Input from '@components/Input';
import Button from '@components/Button';
import LogoIcon from '@assets/icons/logo-icon.svg?react';

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LogoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 12px 0;
`;

const FindLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const FindLink = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  font-size: 12px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.span`
  color: ${(props) => props.theme.COLORS.GRAY[2]};
  font-size: 13px;
`;

const SignUpLink = styled.div`
  color: ${(props) => props.theme.COLORS.LABEL_PRIMARY};
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-top: 12px;

  a {
    color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    margin-left: 6px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginModal: React.FC = () => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const handleLogin = () => {};

  const handleFindUsername = () => {};

  const handleFindPassword = () => {};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <LoginForm>
      <LogoWrapper>
        <LogoIcon width={64} height={64} />
      </LogoWrapper>
      <Input
        id="username"
        type="text"
        label="아이디"
        value={loginForm.username}
        onChange={(e) =>
          setLoginForm((prev) => ({ ...prev, username: e.target.value }))
        }
        onKeyPress={handleKeyPress}
        placeholder="아이디를 입력하세요"
      />
      <Input
        id="password"
        type="password"
        label="비밀번호"
        value={loginForm.password}
        onChange={(e) =>
          setLoginForm((prev) => ({ ...prev, password: e.target.value }))
        }
        onKeyPress={handleKeyPress}
        placeholder="비밀번호를 입력하세요"
      />
      <Button onClick={handleLogin} fullWidth>
        로그인
      </Button>
      <FindLinksWrapper>
        <FindLink onClick={handleFindUsername}>아이디 찾기</FindLink>
        <Divider>|</Divider>
        <FindLink onClick={handleFindPassword}>비밀번호 찾기</FindLink>
      </FindLinksWrapper>
      <SignUpLink>
        잼잼이 처음이신가요?<a href="/signup">회원가입</a>
      </SignUpLink>
    </LoginForm>
  );
};

export default LoginModal;
