import React from 'react';
import styled from '@emotion/styled';

const RoleSelectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const RoleCard = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  aspect-ratio: 1;
  background-color: ${(props) =>
    props.selected ? `${props.theme.COLORS.JAMJAM_PRIMARY[2]}` : 'white'};
  border: 1px solid
    ${(props) =>
      props.selected
        ? props.theme.COLORS.JAMJAM_PRIMARY[1]
        : props.theme.COLORS.GRAY[5]};
  border-radius: 12px;
  text-align: center;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  }
`;

const RoleIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.theme.COLORS.GRAY[2]};
  border-radius: 8px;
  margin: 0 auto 12px;
`;

const RoleTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const RoleDescription = styled.div`
  font-size: 14px;
  line-height: 1.4;
`;

interface RoleSelectionProps {
  selectedRole: 'provider' | 'client' | null;
  onRoleSelect: (role: 'provider' | 'client') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  selectedRole,
  onRoleSelect,
}) => (
  <RoleSelectionContainer>
    <RoleCard
      selected={selectedRole === 'provider'}
      onClick={() => onRoleSelect('provider')}
    >
      <RoleIcon />
      <RoleTitle>경험을 나누고 싶은 분</RoleTitle>
      <RoleDescription>
        내가 할 수 있는 일을
        <br />
        서비스로 만들어 볼래요.
      </RoleDescription>
    </RoleCard>

    <RoleCard
      selected={selectedRole === 'client'}
      onClick={() => onRoleSelect('client')}
    >
      <RoleIcon />
      <RoleTitle>도움을 받고 싶은 분</RoleTitle>
      <RoleDescription>
        지금 필요한 일에
        <br />
        익숙한 손길이 필요해요.
      </RoleDescription>
    </RoleCard>
  </RoleSelectionContainer>
);

export default RoleSelection;
