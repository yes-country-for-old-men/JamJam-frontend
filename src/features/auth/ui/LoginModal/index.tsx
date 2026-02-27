import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  login,
  resetPassword,
  searchLoginId,
} from '@/features/auth/api/authApi';
import LogoIcon from '@/shared/assets/icons/logo-icon.svg?react';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/Input';
import Modal from '@/shared/components/Modal';
import { useDialog } from '@/shared/hooks/useDialog';
import { formatPhoneNumber } from '@/shared/utils';
import * as S from './LoginModal.styles';

type View = 'login' | 'find-id' | 'find-password';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<View>('login');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [findIdForm, setFindIdForm] = useState({
    name: '',
    birth: '',
    phoneNumber: '',
  });
  const [findPasswordForm, setFindPasswordForm] = useState({
    loginId: '',
    name: '',
    birth: '',
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [foundLoginId, setFoundLoginId] = useState('');

  const queryClient = useQueryClient();
  const { alert } = useDialog();

  const resetAndSwitchView = (nextView: View) => {
    setErrorMessage('');
    setFoundLoginId('');
    setFindIdForm({ name: '', birth: '', phoneNumber: '' });
    setFindPasswordForm({ loginId: '', name: '', birth: '', phoneNumber: '' });
    setView(nextView);
  };

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

      onClose();
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

  const handleSearchLoginId = async () => {
    const { name, birth, phoneNumber } = findIdForm;
    if (!name || !birth || !phoneNumber) {
      setErrorMessage('모든 항목을 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await searchLoginId({ name, birth, phoneNumber });
      setFoundLoginId(response.content.loginId);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        setErrorMessage('일치하는 회원 정보를 찾을 수 없습니다.');
      } else {
        setErrorMessage('아이디 찾기 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const { loginId, name, birth, phoneNumber } = findPasswordForm;
    if (!loginId || !name || !birth || !phoneNumber) {
      setErrorMessage('모든 항목을 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      await resetPassword({ loginId, name, birth, phoneNumber });
      await alert({
        title: '발송 완료',
        content:
          '임시 비밀번호를 문자로 발송했습니다.\n로그인 후 비밀번호를 변경해 주세요.',
      });
      resetAndSwitchView('login');
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        setErrorMessage('일치하는 회원 정보를 찾을 수 없습니다.');
      } else {
        setErrorMessage('비밀번호 재설정 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (view === 'login') handleLogin();
    else if (view === 'find-id') handleSearchLoginId();
    else if (view === 'find-password') handleResetPassword();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLElement).blur();
      if (!isLoading) handleLogin();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetAndSwitchView('login');
        onClose();
      }}
      showCloseButton={false}
    >
      <S.LoginForm onSubmit={handleSubmit}>
        {view === 'login' && (
          <>
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
              <S.FindLink
                type="button"
                onClick={() => resetAndSwitchView('find-id')}
              >
                아이디 찾기
              </S.FindLink>
              <S.Divider>|</S.Divider>
              <S.FindLink
                type="button"
                onClick={() => resetAndSwitchView('find-password')}
              >
                비밀번호 찾기
              </S.FindLink>
            </S.FindLinksWrapper>
            <S.SignUpLink>
              잼잼이 처음이신가요?<a href="/signup">회원가입</a>
            </S.SignUpLink>
          </>
        )}
        {view === 'find-id' &&
          (foundLoginId ? (
            <>
              <S.ResultBox>
                회원님의 아이디를 확인해 주세요.
                <S.ResultId>{foundLoginId}</S.ResultId>
              </S.ResultBox>
              <Button
                type="button"
                fullWidth
                onClick={() => resetAndSwitchView('login')}
              >
                로그인
              </Button>
            </>
          ) : (
            <>
              <Input
                id="find-id-name"
                type="text"
                label="이름"
                value={findIdForm.name}
                onChange={(e) =>
                  setFindIdForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="이름을 입력하세요"
                disabled={isLoading}
              />
              <Input
                id="find-id-birth"
                type="date"
                label="생년월일"
                value={findIdForm.birth}
                onChange={(e) =>
                  setFindIdForm((prev) => ({
                    ...prev,
                    birth: e.target.value,
                  }))
                }
                disabled={isLoading}
              />
              <Input
                id="find-id-phone"
                type="tel"
                label="휴대폰 번호"
                value={findIdForm.phoneNumber}
                onChange={(e) =>
                  setFindIdForm((prev) => ({
                    ...prev,
                    phoneNumber: formatPhoneNumber(e.target.value),
                  }))
                }
                placeholder="휴대폰 번호를 입력하세요"
                disabled={isLoading}
              />
              <Button type="submit" fullWidth disabled={isLoading}>
                아이디 찾기
              </Button>
              {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
            </>
          ))}
        {view === 'find-password' && (
          <>
            <Input
              id="findPw-loginId"
              type="text"
              label="아이디"
              value={findPasswordForm.loginId}
              onChange={(e) =>
                setFindPasswordForm((prev) => ({
                  ...prev,
                  loginId: e.target.value,
                }))
              }
              placeholder="아이디를 입력하세요"
              disabled={isLoading}
            />
            <Input
              id="findPw-name"
              type="text"
              label="이름"
              value={findPasswordForm.name}
              onChange={(e) =>
                setFindPasswordForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="이름을 입력하세요"
              disabled={isLoading}
            />
            <Input
              id="findPw-birth"
              type="date"
              label="생년월일"
              value={findPasswordForm.birth}
              onChange={(e) =>
                setFindPasswordForm((prev) => ({
                  ...prev,
                  birth: e.target.value,
                }))
              }
              disabled={isLoading}
            />
            <Input
              id="findPw-phone"
              type="tel"
              label="휴대폰 번호"
              value={findPasswordForm.phoneNumber}
              onChange={(e) =>
                setFindPasswordForm((prev) => ({
                  ...prev,
                  phoneNumber: formatPhoneNumber(e.target.value),
                }))
              }
              placeholder="휴대폰 번호를 입력하세요"
              disabled={isLoading}
            />
            <Button type="submit" fullWidth disabled={isLoading}>
              임시 비밀번호 받기
            </Button>
            {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
          </>
        )}
      </S.LoginForm>
    </Modal>
  );
};

export default LoginModal;
