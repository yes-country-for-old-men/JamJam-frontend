import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import userLogin from '@apis/userLogin';
import Input from '@components/Input';
import Button from '@components/Button';
import LogoIcon from '@assets/icons/logo-icon.svg?react';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LogoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 16px 0;
`;

const FindLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const FindLink = styled.button`
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.span`
  color: ${(props) => props.theme.COLORS.GRAY[2]};
  font-size: 13px;
`;

const SignUpLink = styled.div`
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

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.COLORS.RED};
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  margin-top: 4px;
`;

const LoginModal: React.FC = () => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const handleLogin = async () => {
    if (!loginForm.username || !loginForm.password) {
      setErrorMessage('아이디와 비밀번호를 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const { accessToken } = await userLogin({
        loginId: loginForm.username,
        password: loginForm.password,
      });

      localStorage.setItem('accessToken', accessToken);
      await queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      window.location.reload();

      closeModal();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setErrorMessage('로그인 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      handleLogin();
    }
  };

  const handleFindUsername = () => {};

  const handleFindPassword = () => {};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLElement).blur();

      if (!isLoading) {
        handleLogin();
      }
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <LogoWrapper>
        <LogoIcon height={36} />
      </LogoWrapper>
      <Input
        id="username"
        type="text"
        label="아이디"
        value={loginForm.username}
        onChange={(e) =>
          setLoginForm((prev) => ({ ...prev, username: e.target.value }))
        }
        onKeyDown={handleKeyDown}
        placeholder="아이디를 입력하세요"
        disabled={isLoading}
      />
      <Input
        id="password"
        type="password"
        label="비밀번호"
        value={loginForm.password}
        onChange={(e) =>
          setLoginForm((prev) => ({ ...prev, password: e.target.value }))
        }
        onKeyDown={handleKeyDown}
        placeholder="비밀번호를 입력하세요"
        disabled={isLoading}
      />
      <Button
        type="submit"
        onClick={handleLogin}
        fullWidth
        disabled={isLoading}
      >
        로그인
      </Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <FindLinksWrapper>
        <FindLink type="button" onClick={handleFindUsername}>
          아이디 찾기
        </FindLink>
        <Divider>|</Divider>
        <FindLink type="button" onClick={handleFindPassword}>
          비밀번호 찾기
        </FindLink>
      </FindLinksWrapper>
      <SignUpLink>
        잼잼이 처음이신가요?<a href="/signup">회원가입</a>
      </SignUpLink>
    </LoginForm>
  );
};

export default LoginModal;
