import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { login } from '@/features/auth/api/authApi';
import LogoIcon from '@/shared/assets/icons/logo-icon.svg?react';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/Input';
import { useModal } from '@/shared/hooks/useModal';
import * as S from './LoginModal.styles';

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
      const response = await login({
        loginId: loginForm.username,
        password: loginForm.password,
      });

      localStorage.setItem('accessToken', response.content.accessToken);
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
    <S.LoginForm onSubmit={handleSubmit}>
      <S.LogoWrapper>
        <LogoIcon height={36} />
      </S.LogoWrapper>
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
      {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
      <S.FindLinksWrapper>
        <S.FindLink type="button" onClick={handleFindUsername}>
          아이디 찾기
        </S.FindLink>
        <S.Divider>|</S.Divider>
        <S.FindLink type="button" onClick={handleFindPassword}>
          비밀번호 찾기
        </S.FindLink>
      </S.FindLinksWrapper>
      <S.SignUpLink>
        잼잼이 처음이신가요?<a href="/signup">회원가입</a>
      </S.SignUpLink>
    </S.LoginForm>
  );
};

export default LoginModal;
