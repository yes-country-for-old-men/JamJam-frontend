import React from 'react';
import ClientActiveIcon from '@assets/icons/client-active.svg?react';
import ClientInactiveIcon from '@assets/icons/client-inactive.svg?react';
import ProviderActiveIcon from '@assets/icons/provider-active.svg?react';
import ProviderInactiveIcon from '@assets/icons/provider-inactive.svg?react';
import * as S from '@pages/SignUp/components/RoleSelection/RoleSelection.styles';

interface RoleSelectionProps {
  selectedRole: 'provider' | 'client' | null;
  onRoleSelect: (role: 'provider' | 'client') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  selectedRole,
  onRoleSelect,
}) => (
  <S.Container>
    <S.RoleCard
      selected={selectedRole === 'provider'}
      onClick={() => onRoleSelect('provider')}
    >
      <S.RoleIcon>
        {selectedRole === 'provider' ? (
          <ProviderActiveIcon />
        ) : (
          <ProviderInactiveIcon />
        )}
      </S.RoleIcon>
      <S.RoleTitle>경험을 나누고 싶은 분</S.RoleTitle>
      <S.RoleDescription>
        내가 할 수 있는 일을
        <br />
        서비스로 만들어 볼래요.
      </S.RoleDescription>
    </S.RoleCard>
    <S.RoleCard
      selected={selectedRole === 'client'}
      onClick={() => onRoleSelect('client')}
    >
      <S.RoleIcon>
        {selectedRole === 'client' ? (
          <ClientActiveIcon />
        ) : (
          <ClientInactiveIcon />
        )}
      </S.RoleIcon>
      <S.RoleTitle>도움을 받고 싶은 분</S.RoleTitle>
      <S.RoleDescription>
        지금 필요한 일에
        <br />
        익숙한 손길이 필요해요.
      </S.RoleDescription>
    </S.RoleCard>
  </S.Container>
);

export default RoleSelection;
